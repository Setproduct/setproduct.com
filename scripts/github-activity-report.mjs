#!/usr/bin/env node
// Собирает GitHub- и npm-метрики для 12 утилит из раздела Resources (/freebies),
// проверяет доступность duplicateHref и считает композитный балл 0-100.
//
// Usage:
//   node scripts/github-activity-report.mjs
//   GITHUB_TOKEN=ghp_xxx node scripts/github-activity-report.mjs   # лимит 5000/час вместо 60/час
//
// Output:
//   plans/resources-top10-data.json  - сырьё + посчитанные баллы
//   консоль                          - компактная таблица
//
// Зависимостей нет: только node:fs/promises и глобальный fetch (Node 18+).

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_JSON = path.join(ROOT, 'plans', 'resources-top10-data.json');
const FREEBIES_LISTING = path.join(ROOT, 'data', 'freebies-listing.ts');

const USER_AGENT = 'SetproductResourcesReport/1.0 (+https://setproduct.com)';
const REQUEST_TIMEOUT_MS = 20000;
const PAUSE_MS = 120;

// --- выборка ---------------------------------------------------------------
// npmCandidates: имена пакетов, которые действительно принадлежат этому
// репозиторию. Проверено через registry.npmjs.org (поле repository) и README:
// одноимённые пакеты от других авторов (spectrum-ui от yeliex,
// liquid-glass-react, pdfcn от aniket508) сюда НЕ включены, иначе метрика
// приписала бы чужой трафик.
// null = пакета в npm нет (десктопное приложение, web-инструмент, набор иконок
// без собственного пакета), такой участник получает медианный балл по npm.
const REPOS = [
  {
    slug: 'm3e-canvas',
    owner: 'lnkiai',
    repo: 'm3e-canvas',
    kind: 'web tool',
    npmCandidates: null,
  },
  {
    slug: 'rea',
    owner: 'morluto',
    repo: 'rea',
    kind: 'MCP server',
    // rea-agents — основной пакет (549k загрузок), @morluto/rea — старый 0.2.1
    npmCandidates: ['rea-agents', '@morluto/rea'],
  },
  {
    slug: 'driver-js',
    owner: 'nilbuild',
    repo: 'driver.js',
    kind: 'JS library',
    npmCandidates: ['driver.js'],
  },
  {
    slug: 'liquid-glass',
    owner: 'Glass-HQ',
    repo: 'liquid-glass',
    kind: 'React library',
    // по README: npm install @glass-sdk/liquid-glass
    npmCandidates: ['@glass-sdk/liquid-glass'],
  },
  {
    slug: 'sfinterface-numbers',
    owner: 'wherescz',
    repo: 'sfinterface-numbers',
    kind: 'React library',
    npmCandidates: ['@sfinterface/numbers'],
  },
  {
    slug: 'amicro',
    owner: 'Subhan-code',
    repo: 'Amicro--Micro-transitions-',
    kind: 'CSS/JS snippets',
    npmCandidates: ['@subhanhq/amicro'],
  },
  {
    slug: 'runeicons',
    owner: 'Nexvyn',
    repo: 'runeicons',
    kind: 'icon set',
    // Nexvyn/runeicons редиректит на Runeicons/runeicons — это тот же пакет
    npmCandidates: ['runeicons'],
  },
  {
    slug: 'fsearch',
    owner: 'noahdunnagan',
    repo: 'fsearch',
    kind: 'macOS app',
    npmCandidates: null,
  },
  {
    slug: 'gr8r-task-management',
    owner: 'gr8rstudio',
    repo: 'gr8r-studio',
    kind: 'web app',
    npmCandidates: null,
  },
  {
    slug: 'compositor',
    owner: 'robbietilton',
    repo: 'Compositor',
    kind: 'macOS app',
    npmCandidates: null,
  },
  {
    slug: 'spectrum-ui',
    owner: 'arihantcodes',
    repo: 'spectrum-ui',
    kind: 'React library',
    // компоненты ставятся через shadcn CLI, собственного пакета нет;
    // @spectrumui/mcp — вспомогательный MCP-сервер того же автора
    npmCandidates: ['@spectrumui/mcp'],
  },
  {
    slug: 'pdfcn',
    owner: 'shadcn-labs',
    repo: 'pdfcn',
    kind: 'React library',
    // раздаётся через shadcn registry, npm-пакета у проекта нет
    npmCandidates: null,
  },
];

// --- входные цифры GA4 (окно 20 сентября - 19 октября 2026, скриншот автора) --
// pageviews, activeUsers, avgEngagementSeconds
const GA4 = {
  'm3e-canvas': { pageviews: 1488, activeUsers: 1099, engagement: 21 },
  'rea': { pageviews: 71, activeUsers: 61, engagement: 20 },
  'driver-js': { pageviews: 49, activeUsers: 44, engagement: 7 },
  'liquid-glass': { pageviews: 48, activeUsers: 45, engagement: 41 },
  'sfinterface-numbers': { pageviews: 46, activeUsers: 35, engagement: 21 },
  'amicro': { pageviews: 42, activeUsers: 40, engagement: 5 },
  'runeicons': { pageviews: 29, activeUsers: 25, engagement: 7 },
  'fsearch': { pageviews: 27, activeUsers: 26, engagement: 9 },
  'gr8r-task-management': { pageviews: 22, activeUsers: 16, engagement: 22 },
  'compositor': { pageviews: 20, activeUsers: 18, engagement: 6 },
  'spectrum-ui': { pageviews: 16, activeUsers: 14, engagement: 22 },
  'pdfcn': { pageviews: 15, activeUsers: 12, engagement: 13 },
};

// --- веса композитного балла (согласованы с автором) ------------------------
const WEIGHTS = {
  traffic: 0.25,
  engagement: 0.15,
  stars: 0.30,
  freshness: 0.15,
  npm: 0.15,
};

const STARS_CAP = 10000;      // log10(10000) / 4 = 1, дальше рост не даёт бонуса
const FRESH_FULL_DAYS = 30;
const FRESH_ZERO_DAYS = 180;

// --- helpers ---------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ghHeaders() {
  const h = {
    'user-agent': USER_AGENT,
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) h.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(new Error('timeout')), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// Возвращает { ok, status, data, headers, error }
async function getJson(url, headers = {}) {
  try {
    const res = await fetchWithTimeout(url, { method: 'GET', headers });
    let data = null;
    if (res.status !== 204) {
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text.slice(0, 200);
        }
      }
    }
    return { ok: res.ok, status: res.status, data, headers: res.headers, error: null };
  } catch (err) {
    return { ok: false, status: 0, data: null, headers: new Headers(), error: String(err) };
  }
}

function rateLimitNote(res) {
  if (res.status !== 403 && res.status !== 429) return null;
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== '0') return null;
  const reset = Number(res.headers.get('x-ratelimit-reset') || 0);
  const when = reset ? new Date(reset * 1000).toISOString() : 'unknown';
  return `GitHub API rate limit exhausted, reset at ${when}`;
}

// Число контрибьюторов из заголовка Link (?per_page=1&anon=1)
function contributorsFromLink(linkHeader, fallbackLength) {
  if (!linkHeader) return { count: fallbackLength, source: 'array' };
  const parts = linkHeader.split(',').map((p) => p.trim());
  const last = parts.find((p) => /rel="last"/.test(p));
  if (!last) return { count: fallbackLength, source: 'array' };
  const m = last.match(/[?&]page=(\d+)/);
  if (!m) return { count: fallbackLength, source: 'array' };
  return { count: Number(m[1]), source: 'link' };
}

function daysBetween(fromIso, toDate) {
  if (!fromIso) return null;
  const from = new Date(fromIso);
  if (Number.isNaN(from.getTime())) return null;
  return Math.floor((toDate.getTime() - from.getTime()) / 86400000);
}

// --- GitHub ----------------------------------------------------------------

async function fetchRepo(entry) {
  const base = `https://api.github.com/repos/${entry.owner}/${entry.repo}`;
  const out = {
    slug: entry.slug,
    kind: entry.kind,
    repo: `https://github.com/${entry.owner}/${entry.repo}`,
    ok: false,
    errors: [],
    n_a: [],
    stars: null,
    forks: null,
    openIssues: null,
    createdAt: null,
    pushedAt: null,
    archived: null,
    license: null,
    description: null,
    topics: [],
    latestRelease: null,
    releasePublishedAt: null,
    contributors: null,
    contributorsSource: null,
    npmPackage: null,
    npmDownloads: null,
    npmChecked: false,
  };

  const repoRes = await getJson(base, ghHeaders());
  const rl = rateLimitNote(repoRes);
  if (rl) out.errors.push(rl);

  if (repoRes.ok && repoRes.data && typeof repoRes.data === 'object') {
    const d = repoRes.data;
    out.ok = true;
    out.stars = d.stargazers_count ?? null;
    out.forks = d.forks_count ?? null;
    out.openIssues = d.open_issues_count ?? null;
    out.createdAt = d.created_at ?? null;
    out.pushedAt = d.pushed_at ?? null;
    out.archived = typeof d.archived === 'boolean' ? d.archived : null;
    out.license = d.license?.spdx_id ?? (d.license === null ? 'none' : null);
    out.description = d.description ?? null;
    out.topics = Array.isArray(d.topics) ? d.topics : [];
    out.defaultBranch = d.default_branch ?? null;
  } else {
    out.errors.push(`GET /repos -> ${repoRes.status || 'network'} ${repoRes.error || ''}`.trim());
    out.n_a.push('stars', 'forks', 'openIssues', 'createdAt', 'pushedAt', 'archived', 'license', 'description', 'topics');
  }

  await sleep(PAUSE_MS);

  // latest release: 404 = релизов нет, это не ошибка
  const relRes = await getJson(`${base}/releases/latest`, ghHeaders());
  if (relRes.ok && relRes.data && typeof relRes.data === 'object') {
    out.latestRelease = relRes.data.tag_name ?? null;
    out.releasePublishedAt = relRes.data.published_at ?? null;
  } else if (relRes.status === 404) {
    out.latestRelease = 'no releases';
  } else {
    const note = rateLimitNote(relRes);
    if (note) out.errors.push(note);
    out.errors.push(`GET /releases/latest -> ${relRes.status || 'network'}`);
    out.n_a.push('latestRelease');
  }

  await sleep(PAUSE_MS);

  // contributors через Link-заголовок
  const conRes = await getJson(`${base}/contributors?per_page=1&anon=1`, ghHeaders());
  if (conRes.ok && Array.isArray(conRes.data)) {
    const { count, source } = contributorsFromLink(conRes.headers.get('link'), conRes.data.length);
    out.contributors = count;
    out.contributorsSource = source;
  } else {
    const note = rateLimitNote(conRes);
    if (note) out.errors.push(note);
    out.errors.push(`GET /contributors -> ${conRes.status || 'network'}`);
    out.n_a.push('contributors');
  }

  return out;
}

// --- npm -------------------------------------------------------------------

async function fetchNpm(entry, record) {
  if (!entry.npmCandidates || entry.npmCandidates.length === 0) {
    record.npmChecked = true;
    record.npmDownloads = null;
    return record;
  }
  record.npmChecked = true;
  for (const pkg of entry.npmCandidates) {
    const url = `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg).replace('%40', '@')}`;
    const res = await getJson(url, { 'user-agent': USER_AGENT });
    if (res.ok && res.data && typeof res.data.downloads === 'number') {
      record.npmPackage = pkg;
      record.npmDownloads = res.data.downloads;
      return record;
    }
    await sleep(PAUSE_MS);
  }
  record.npmDownloads = null;
  return record;
}

// --- проверка ссылок --------------------------------------------------------

// data/freebies-listing.ts — TS-модуль, напрямую не импортируется: парсим пары slug/duplicateHref
async function readDuplicateHrefs() {
  const src = await fs.readFile(FREEBIES_LISTING, 'utf8');
  const items = [];
  const blocks = src.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const href = block.match(/duplicateHref:\s*"([^"]+)"/)?.[1];
    if (slug && href) items.push({ slug, href });
  }
  return items;
}

// Figma и часть CDN отвечают 404 на HEAD и 200 на GET, поэтому HEAD-результат
// не финальный: любой не-2xx прогоняется повторно через GET.
async function checkUrl(href) {
  const headers = { 'user-agent': USER_AGENT, accept: 'text/html,*/*' };
  try {
    const head = await fetchWithTimeout(href, { method: 'HEAD', headers, redirect: 'follow' });
    if (head.status > 0 && head.status < 400) {
      return { href, status: head.status, ok: true, method: 'HEAD' };
    }
    const got = await fetchWithTimeout(href, { method: 'GET', headers, redirect: 'follow' });
    return {
      href,
      status: got.status,
      ok: got.status > 0 && got.status < 400,
      method: 'GET',
      headStatus: head.status,
    };
  } catch (err) {
    return { href, status: 0, ok: false, error: String(err) };
  }
}

// --- композитный балл -------------------------------------------------------

const log10 = (x) => Math.log(x) / Math.LN10;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function minMax(values) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (nums.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

function normalizeMinMax(value, bounds) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (bounds.max === bounds.min) return 1;
  return (value - bounds.min) / (bounds.max - bounds.min);
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  if (s.length === 0) return null;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function freshnessScore(pushedAt, now) {
  const days = daysBetween(pushedAt, now);
  if (days === null) return { days: null, score: null };
  return { days, score: clamp(1 - (days - FRESH_FULL_DAYS) / 150, 0, 1) };
}

function scoreAll(records, now) {
  const rows = records.map((r) => ({
    slug: r.slug,
    pageviews: GA4[r.slug]?.pageviews ?? null,
    engagement: GA4[r.slug]?.engagement ?? null,
    stars: r.stars,
    pushedAt: r.pushedAt,
    npmDownloads: r.npmDownloads,
  }));

  // npm: отсутствие пакета заменяется медианой по выборке (после логарифма — медианой логов)
  const npmLogs = rows.map((r) => (typeof r.npmDownloads === 'number' ? log10(Math.max(r.npmDownloads, 1)) : null));
  const npmMedianLog = median(npmLogs.filter((v) => v !== null));
  const npmLogFilled = npmLogs.map((v) => (v === null ? npmMedianLog : v));
  const npmBounds = minMax(npmLogFilled);

  const trafficBounds = minMax(rows.map((r) => (r.pageviews ? log10(r.pageviews) : null)));
  const engagementBounds = minMax(rows.map((r) => r.engagement));

  const scored = rows.map((r, i) => {
    const trafficNorm = r.pageviews ? normalizeMinMax(log10(r.pageviews), trafficBounds) : null;
    const engagementNorm = normalizeMinMax(r.engagement, engagementBounds);
    const starsNorm =
      typeof r.stars === 'number' ? Math.min(1, log10(Math.max(r.stars, 1)) / 4) : null;
    const fresh = freshnessScore(r.pushedAt, now);
    const npmNorm = normalizeMinMax(npmLogFilled[i], npmBounds);

    const parts = {
      traffic: trafficNorm === null ? null : trafficNorm * WEIGHTS.traffic,
      engagement: engagementNorm === null ? null : engagementNorm * WEIGHTS.engagement,
      stars: starsNorm === null ? null : starsNorm * WEIGHTS.stars,
      freshness: fresh.score === null ? null : fresh.score * WEIGHTS.freshness,
      npm: npmNorm === null ? null : npmNorm * WEIGHTS.npm,
    };

    const missing = Object.entries(parts).filter(([, v]) => v === null).map(([k]) => k);
    const score =
      missing.length === 0
        ? Object.values(parts).reduce((a, b) => a + b, 0) * 100
        : null;

    return {
      slug: r.slug,
      pageviews: r.pageviews,
      engagement: r.engagement,
      stars: r.stars,
      pushedAt: r.pushedAt,
      pushedDaysAgo: fresh.days,
      npmDownloads: r.npmDownloads,
      npmUsedMedian: typeof r.npmDownloads !== 'number',
      npmPackage: records.find((x) => x.slug === r.slug)?.npmPackage ?? null,
      norm: {
        traffic: trafficNorm,
        engagement: engagementNorm,
        stars: starsNorm,
        freshness: fresh.score,
        npm: npmNorm,
      },
      parts,
      score: score === null ? null : Math.round(score * 10) / 10,
      missing,
    };
  });

  // запасное правило: если компонент отсутствует (n/a от API), он получает медиану
  // по выборке, чтобы не обнулять участника; в отчёте это помечается
  for (const row of scored) {
    if (row.missing.length === 0) continue;
    for (const key of row.missing) {
      const pool = scored.map((s) => s.parts[key]).filter((v) => typeof v === 'number');
      if (pool.length === 0) continue;
      row.parts[key] = median(pool);
    }
    row.score = Math.round(Object.values(row.parts).reduce((a, b) => a + b, 0) * 1000) / 10;
  }

  scored.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  return scored;
}

// --- вывод ------------------------------------------------------------------

function pad(v, n) {
  const s = v === null || v === undefined ? 'n/a' : String(v);
  return s.length > n ? s.slice(0, n) : s.padEnd(n);
}
function padStart(v, n) {
  const s = v === null || v === undefined ? 'n/a' : String(v);
  return s.length > n ? s.slice(0, n) : s.padStart(n);
}

function printTable(records, scored, broken) {
  console.log('\nGitHub / npm');
  console.log(
    pad('slug', 22) +
      padStart('stars', 7) +
      padStart('forks', 7) +
      padStart('issues', 7) +
      padStart('contr', 7) +
      padStart('age', 6) +
      padStart('push', 7) +
      '  ' +
      pad('license', 10) +
      pad('release', 16) +
      padStart('npm/mo', 9) +
      '  archived'
  );
  for (const r of records) {
    const age = daysBetween(r.createdAt, NOW);
    console.log(
      pad(r.slug, 22) +
        padStart(r.stars, 7) +
        padStart(r.forks, 7) +
        padStart(r.openIssues, 7) +
        padStart(r.contributors, 7) +
        padStart(age === null ? null : `${age}d`, 6) +
        padStart(daysBetween(r.pushedAt, NOW) === null ? null : `${daysBetween(r.pushedAt, NOW)}d ago`, 12) +
        '  ' +
        pad(r.license, 10) +
        pad(r.latestRelease, 16) +
        padStart(r.npmDownloads, 9) +
        '  ' +
        (r.archived === null ? 'n/a' : r.archived ? 'yes' : 'no')
    );
  }

  console.log('\nComposite score (0-100)');
  console.log(
    pad('slug', 22) +
      padStart('traffic', 8) +
      padStart('engage', 8) +
      padStart('stars', 8) +
      padStart('fresh', 8) +
      padStart('npm', 8) +
      padStart('score', 8) +
      padStart('GA4 pv', 9)
  );
  for (const s of scored) {
    const f = (v) => (typeof v === 'number' ? v.toFixed(1) : 'n/a');
    console.log(
      pad(s.slug, 22) +
        padStart(f(s.parts.traffic), 8) +
        padStart(f(s.parts.engagement), 8) +
        padStart(f(s.parts.stars), 8) +
        padStart(f(s.parts.freshness), 8) +
        padStart(f(s.parts.npm) + (s.npmUsedMedian ? '*' : ''), 8) +
        padStart(f(s.score), 8) +
        padStart(s.pageviews, 9)
    );
  }

  if (broken.length) {
    console.log('\nBroken duplicateHref');
    for (const b of broken) console.log(`  ${b.slug} -> ${b.status} ${b.href}`);
  } else {
    console.log('\nBroken duplicateHref: none');
  }
}

// --- main -------------------------------------------------------------------

const NOW = new Date();

async function main() {
  console.log(`GitHub token: ${process.env.GITHUB_TOKEN ? 'yes' : 'no (60 req/h limit)'}`);
  console.log(`Repos: ${REPOS.length}`);

  const records = [];
  for (const entry of REPOS) {
    process.stdout.write(`  ${entry.slug} ... `);
    const rec = await fetchRepo(entry);
    await fetchNpm(entry, rec);
    console.log(rec.ok ? `${rec.stars} stars` : 'FAILED');
    records.push(rec);
    await sleep(PAUSE_MS);
  }

  const scored = scoreAll(records, NOW);

  let hrefs = [];
  try {
    hrefs = await readDuplicateHrefs();
  } catch (err) {
    console.error(`Cannot read ${FREEBIES_LISTING}: ${err}`);
  }

  const linkChecks = [];
  for (const item of hrefs) {
    const res = await checkUrl(item.href);
    linkChecks.push({ ...item, ...res });
    await sleep(PAUSE_MS);
  }
  const broken = linkChecks.filter((c) => !c.ok);
  const suspected = new Set(['nilbuild/driver.js', 'morluto/rea', 'noahdunnagan/fsearch']);
  const suspectedResults = linkChecks.filter((c) =>
    [...suspected].some((s) => c.href.toLowerCase().includes(s.toLowerCase()))
  );

  const payload = {
    generatedAt: NOW.toISOString(),
    window: { from: '2026-09-20', to: '2026-10-19' },
    weights: WEIGHTS,
    githubToken: Boolean(process.env.GITHUB_TOKEN),
    ga4: GA4,
    repos: records,
    scores: scored,
    linkChecks,
    suspectedLinks: suspectedResults,
  };

  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  printTable(records, scored, broken);
  console.log(`\nLinks checked: ${linkChecks.length}, broken: ${broken.length}`);
  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}`);

  const failed = records.filter((r) => !r.ok);
  if (failed.length) {
    console.log(`\nUnavailable repos (n/a in report): ${failed.map((r) => r.slug).join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
