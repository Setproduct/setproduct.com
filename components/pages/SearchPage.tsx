"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Только типы: сам модуль fuse.js грузится динамически (см. loadFuse),
// чтобы не утяжелять стартовый JS страницы.
import type Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import {
  SEARCHABLE_TYPE_BADGES,
  SEARCH_GROUP_LABELS,
  SEARCH_GROUP_OF,
  SEARCH_GROUP_ORDER,
  getSearchItemUrl,
  type SearchGroup,
  type SearchableItem,
} from "../../lib/search/types";
import { SEARCH_KEYS, buildFuseQuery, tokenizeQuery } from "../../lib/search/synonyms";
import { SLIDER_PRODUCTS } from "../../data/slider-products";
import { useContactModal } from "../modals/ContactModalContext";
import {
  buildHighlightRegExp,
  buildSnippet,
  splitByMatches,
} from "../../lib/search/highlight";
import { SEARCH_SUGGESTIONS } from "../../data/search-suggestions";
import { event as gtagEvent } from "../../lib/gtag";
import type { BlogPostPreview } from "../../types/data";

const SLUG = "search";
// Во вкладке «All» каждая группа показывает короткое превью.
const ALL_GROUP_PREVIEW = 4;
// Во вкладке конкретного типа — плоский список, догружаемый порциями.
const TYPE_PAGE_SIZE = 20;
// Top results: сколько карточек, порог релевантности и минимальный размер выдачи.
const TOP_COUNT = 3;
const TOP_SCORE = 0.1;
const TOP_MIN_TOTAL = 4;
// Сколько популярных китов и свежих постов показывать на пустых экранах.
const POPULAR_KITS_COUNT = 4;
const FRESH_POSTS_COUNT = 3;
// GA4: запрос считается «законченным», если пользователь не печатает 1,5 с.
// Так в отчёт не попадают промежуточные «des», «desi», «desig».
const ANALYTICS_DELAY = 1500;

// Ссылки «Browse by type» для стартового экрана. Порядок как у табов:
// блог первым. Dashboards без счётчика: в поиске они часть UI kits.
const BROWSE_LINKS: { label: string; href: string; type?: SearchGroup }[] = [
  { label: "Blog", href: "/blog", type: "blog" },
  { label: "Freebies", href: "/freebies", type: "freebie" },
  { label: "UI kits", href: "/all", type: "product" },
  { label: "Bundles", href: "/bundle", type: "bundle" },
  { label: "Dashboards", href: "/dashboards" },
];

type FuseCtor = typeof Fuse;

// Буст блога: блог сейчас главный контент сайта, поэтому при близкой
// релевантности пост должен стоять выше кита. Score у Fuse: 0 = идеально,
// 1 = мимо. Множитель < 1 «подтягивает» посты вверх, но не вытаскивает
// слабое совпадение над точным (0.5 × 0.8 = 0.4 всё равно хуже 0.1).
const SCORE_BOOST: Partial<Record<SearchableItem["type"], number>> = {
  blog: 0.8,
};

function runSearch(fuse: Fuse<SearchableItem> | null, raw: string): FuseResult<SearchableItem>[] {
  const trimmed = raw.trim();
  if (!fuse || trimmed.length < 2) return [];
  // Пословный поиск с синонимами: все слова обязательны,
  // каждое может совпасть в любом поле или через синоним.
  const expression = buildFuseQuery(trimmed);
  // Без limit: индекс небольшой, а счётчик должен быть честным.
  const found = expression ? fuse.search(expression) : fuse.search(trimmed);
  // sort стабилен: при равном score сохраняется исходный порядок Fuse.
  return found
    .map((r) => ({ ...r, score: (r.score ?? 1) * (SCORE_BOOST[r.item.type] ?? 1) }))
    .sort((a, b) => a.score - b.score);
}

// Словарь для «Did you mean»: слова из заголовков, категорий и подсказок.
function buildVocabulary(items: SearchableItem[]): string[] {
  const words = new Set<string>();
  const add = (text?: string) => {
    if (!text) return;
    for (const token of tokenizeQuery(text)) {
      if (token.length >= 3 && !/^\d+$/.test(token)) words.add(token);
    }
  };
  for (const item of items) {
    add(item.title);
    add(item.category);
  }
  SEARCH_SUGGESTIONS.forEach(add);
  return Array.from(words);
}

// Популярные киты: по очереди берём лидеров из каждой подборки слайдеров.
function pickPopularKits(items: SearchableItem[], count: number): SearchableItem[] {
  const bySlug = new Map(
    items.filter((i) => i.type === "product").map((i) => [i.slug, i]),
  );
  const lists = Object.values(SLIDER_PRODUCTS);
  const picked: SearchableItem[] = [];
  const seen = new Set<string>();
  const longest = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < longest && picked.length < count; i++) {
    for (const list of lists) {
      const slug = list[i];
      const item = slug ? bySlug.get(slug) : undefined;
      if (item && !seen.has(slug) && item.image) {
        seen.add(slug);
        picked.push(item);
        if (picked.length === count) break;
      }
    }
  }
  return picked;
}

function SuggestionChips({ label }: { label: string }) {
  return (
    <nav aria-label={label}>
      <h2 className="subtitle-all-caps mt-0">{label}</h2>
      <div className="spacer-16" />
      <div className="flex flex-wrap gap-3">
        {SEARCH_SUGGESTIONS.map((suggestion) => (
          <Link
            key={suggestion}
            href={{ pathname: "/search", query: { query: suggestion } }}
            shallow
            scroll={false}
            className="blog_list-filters-item m-0! cursor-pointer no-underline text-inherit bg-(--light-purple)! border border-(--light-primary) hover:border-(--primary) transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
          >
            <span className="text-size-regular">{suggestion}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

type SearchTab = "all" | SearchGroup;

// Старые ссылки ?type=template и ?type=dashboard ведут в UI kits:
// таба Templates больше нет, дашборд-страницы живут внутри UI kits.
const LEGACY_TAB_ALIASES: Record<string, SearchGroup> = {
  template: "product",
  dashboard: "product",
};

function parseTab(value: unknown): SearchTab {
  if (typeof value !== "string") return "all";
  if (value in LEGACY_TAB_ALIASES) return LEGACY_TAB_ALIASES[value];
  return (SEARCH_GROUP_ORDER as readonly string[]).includes(value)
    ? (value as SearchGroup)
    : "all";
}

type Props = {
  items: SearchableItem[];
  blogPosts?: BlogPostPreview[];
};

function Highlight({ text, re }: { text: string; re: RegExp | null }) {
  return (
    <>
      {splitByMatches(text, re).map((seg, i) =>
        seg.match ? (
          <mark
            key={i}
            className="bg-(--light-primary) text-inherit rounded-sm px-0.5 -mx-0.5"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

function ResultRow({ item, re }: { item: SearchableItem; re: RegExp | null }) {
  const meta: string[] = [];
  if (item.category) meta.push(item.category);
  if (item.type === "blog" && item.readingTime) meta.push(item.readingTime);
  if (!item.isFree && item.price) meta.push(item.price);

  return (
    <li>
      <Link
        href={getSearchItemUrl(item)}
        className="hover-lift flex gap-4 items-start no-underline text-inherit radius-12 outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-4"
      >
        <div className="hover-lift-media relative w-18 h-18 md:w-32 md:h-24 radius-12 shrink-0 overflow-hidden bg-(--light-primary)">
          {item.image ? (
            <Image
              alt=""
              fill
              src={item.image}
              sizes="(min-width: 768px) 128px, 72px"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-full h-full flex items-center justify-center text-size-tiny text-weight-semibold uppercase tracking-wide text-(--primary)"
            >
              {SEARCHABLE_TYPE_BADGES[item.type]}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-x-2 gap-y-1 items-center mb-1">
            <span className="text-size-tiny text-weight-semibold uppercase tracking-wide rounded px-1.5 py-0.5 bg-(--light-primary) text-(--dark-primary)">
              {SEARCHABLE_TYPE_BADGES[item.type]}
            </span>
            {item.isFree && (
              <span className="text-size-tiny text-weight-semibold text-(--primary)">
                Free
              </span>
            )}
            {meta.length > 0 && (
              <span className="text-size-tiny text-weight-semibold opacity-70 min-w-0 truncate">
                {meta.join(" · ")}
              </span>
            )}
          </div>
          <p className="hover-lift-title text-xl! font-semibold! leading-6! text-style-2lines m-0">
            <Highlight text={item.title} re={re} />
          </p>
          <div className="spacer-4" />
          <p className="text-size-small text-style-2lines mt-0 mb-0 opacity-80">
            <Highlight text={buildSnippet(item.description, re)} re={re} />
          </p>
        </div>
      </Link>
    </li>
  );
}

// Крупная карточка для блока «Top results».
// На десктопе превью 16:9 в три колонки, на мобильных — строка как в обычной выдаче.
function TopResultCard({ item, re }: { item: SearchableItem; re: RegExp | null }) {
  return (
    <li>
      <Link
        href={getSearchItemUrl(item)}
        className="hover-lift flex md:flex-col gap-4 md:gap-3 items-start no-underline text-inherit radius-16 outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-4"
      >
        <div className="hover-lift-media relative w-18 h-18 md:w-full md:h-auto md:aspect-video radius-16 shrink-0 overflow-hidden bg-(--light-primary)">
          {item.image ? (
            <Image
              alt=""
              fill
              src={item.image}
              sizes="(min-width: 768px) 33vw, 72px"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-full h-full flex items-center justify-center text-size-tiny text-weight-semibold uppercase tracking-wide text-(--primary)"
            >
              {SEARCHABLE_TYPE_BADGES[item.type]}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-x-2 gap-y-1 items-center mb-1">
            <span className="text-size-tiny text-weight-semibold uppercase tracking-wide rounded px-1.5 py-0.5 bg-(--light-primary) text-(--dark-primary)">
              {SEARCHABLE_TYPE_BADGES[item.type]}
            </span>
            {item.isFree ? (
              <span className="text-size-tiny text-weight-semibold text-(--primary)">Free</span>
            ) : item.price ? (
              <span className="text-size-tiny text-weight-semibold opacity-70">{item.price}</span>
            ) : null}
          </div>
          <p className="hover-lift-title text-xl! font-semibold! leading-6! text-style-2lines m-0">
            <Highlight text={item.title} re={re} />
          </p>
        </div>
      </Link>
    </li>
  );
}

function groupResults(results: SearchableItem[]): Record<SearchGroup, SearchableItem[]> {
  const grouped: Record<SearchGroup, SearchableItem[]> = {
    blog: [],
    freebie: [],
    product: [],
    bundle: [],
  };

  for (const item of results) {
    grouped[SEARCH_GROUP_OF[item.type]].push(item);
  }
  return grouped;
}

export default function SearchPage({ items, blogPosts = [] }: Props) {
  const meta = PAGE_META[SLUG];
  const breadcrumbs = PAGE_BREADCRUMBS[SLUG] ?? [];
  const router = useRouter();
  const { openContactModal } = useContactModal();

  const initialQuery =
    typeof router.query.query === "string" ? router.query.query : "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const tabRefs = useRef<Partial<Record<SearchTab, HTMLButtonElement | null>>>({});

  // Активная вкладка живёт в URL (?type=), чтобы ссылкой можно было поделиться.
  const activeTab = parseTab(router.query.type);
  // Категория блога внутри таба Blog, тоже в URL (?category=).
  const activeCategory =
    typeof router.query.category === "string" ? router.query.category : null;

  // Сколько строк показано во вкладке конкретного типа.
  const [visibleCount, setVisibleCount] = useState(TYPE_PAGE_SIZE);

  // На SSG-странице router.query пуст при первом рендере.
  // Ждём router.isReady, чтобы не мигать пустым состоянием.
  const isReady = router.isReady;

  useEffect(() => {
    if (!router.isReady) return;
    const q = typeof router.query.query === "string" ? router.query.query : "";
    // Не перетираем поле, если URL лишь догнал текущий ввод
    // (иначе съедается пробел в конце при наборе фразы).
    setInputValue((prev) => (prev.trim() === q ? prev : q));
    setQuery(q);
  }, [router.isReady, router.query.query]);

  // Новый запрос, другая вкладка или категория — начинаем список сначала.
  useEffect(() => {
    setVisibleCount(TYPE_PAGE_SIZE);
  }, [query, activeTab, activeCategory]);

  const selectTab = (tab: SearchTab) => {
    const nextQuery = { ...router.query };
    if (tab === "all") {
      delete nextQuery.type;
    } else {
      nextQuery.type = tab;
    }
    // Категория имеет смысл только внутри таба Blog.
    delete nextQuery.category;
    router.push(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  const selectCategory = (category: string | null) => {
    const nextQuery = { ...router.query };
    if (category) {
      nextQuery.category = category;
    } else {
      delete nextQuery.category;
    }
    router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  const clearInput = () => {
    setInputValue("");
    setQuery("");
    inputRef.current?.focus();
  };

  // Debounce: обновляем выдачу и URL (?query=) через 250 мс после ввода.
  // router.replace + shallow не добавляет запись в историю и не перезагружает данные.
  useEffect(() => {
    if (!router.isReady) return;
    const id = setTimeout(() => {
      const trimmed = inputValue.trim();
      setQuery(trimmed);
      const current =
        typeof router.query.query === "string" ? router.query.query : "";
      if (current === trimmed) return;
      const nextQuery = { ...router.query };
      if (trimmed) {
        nextQuery.query = trimmed;
      } else {
        delete nextQuery.query;
      }
      router.replace(
        { pathname: router.pathname, query: nextQuery },
        undefined,
        { shallow: true, scroll: false },
      );
    }, 250);
    return () => clearTimeout(id);
  }, [inputValue, router.isReady]);

  // Lazy Fuse: модуль подгружается при фокусе на поле или при запросе от 2 символов.
  const [FuseClass, setFuseClass] = useState<FuseCtor | null>(null);
  const fuseLoadingRef = useRef(false);
  const loadFuse = () => {
    if (fuseLoadingRef.current) return;
    fuseLoadingRef.current = true;
    import("fuse.js")
      .then((mod) => setFuseClass(() => mod.default))
      .catch(() => {
        // Дадим шанс повторить загрузку при следующем вводе.
        fuseLoadingRef.current = false;
      });
  };
  useEffect(() => {
    if (inputValue.trim().length >= 2 || query.trim().length >= 2) loadFuse();
  }, [inputValue, query]);
  const fuseReady = FuseClass !== null;

  const fuse = useMemo(
    () =>
      FuseClass &&
      new FuseClass(items, {
        keys: SEARCH_KEYS.map((k) => ({ ...k })),
        // Каждое слово ищется отдельно, поэтому порог можно держать строже.
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [FuseClass, items],
  );

  const results = useMemo<FuseResult<SearchableItem>[]>(
    () => runSearch(fuse, query),
    [fuse, query],
  );

  // GA4: событие search (рекомендованное Google, поле search_term)
  // и отдельное search_no_results для запросов без выдачи.
  // Один и тот же запрос подряд не отправляется повторно.
  const lastTrackedRef = useRef("");
  useEffect(() => {
    if (!isReady || !fuseReady) return;
    const term = query.trim().toLowerCase();
    if (term.length < 2 || term === lastTrackedRef.current) return;
    const count = results.length;
    const id = setTimeout(() => {
      lastTrackedRef.current = term;
      gtagEvent("search", { search_term: term, results_count: count });
      if (count === 0) {
        gtagEvent("search_no_results", { search_term: term });
      }
    }, ANALYTICS_DELAY);
    return () => clearTimeout(id);
  }, [isReady, fuseReady, query, results.length]);

  // Нечёткий поиск по словарю сайта для «Did you mean».
  const vocabFuse = useMemo(
    () =>
      FuseClass &&
      new FuseClass(buildVocabulary(items), {
        threshold: 0.45,
        ignoreLocation: true,
        includeScore: true,
      }),
    [FuseClass, items],
  );

  const didYouMean = useMemo<string[]>(() => {
    if (!fuse || !vocabFuse || results.length > 0) return [];
    const tokens = tokenizeQuery(query);
    if (tokens.length === 0) return [];
    const corrected = tokens.map((token) => {
      const best = vocabFuse.search(token, { limit: 1 })[0];
      return best ? best.item : token;
    });
    const candidates: string[] = [];
    const phrase = corrected.join(" ");
    if (phrase !== tokens.join(" ") && runSearch(fuse, phrase).length > 0) {
      candidates.push(phrase);
    }
    // Если фраза целиком не находится, предлагаем отдельные слова.
    if (tokens.length > 1) {
      for (const word of corrected) {
        if (candidates.length >= 3) break;
        if (!candidates.includes(word) && runSearch(fuse, word).length > 0) {
          candidates.push(word);
        }
      }
    }
    return candidates;
  }, [fuse, vocabFuse, query, results.length]);

  const popularKits = useMemo(
    () => pickPopularKits(items, POPULAR_KITS_COUNT),
    [items],
  );

  // Свежие посты: blogPosts уже отсортированы по дате, берём данные из индекса.
  const freshPosts = useMemo(() => {
    const bySlug = new Map(
      items.filter((i) => i.type === "blog").map((i) => [i.slug, i]),
    );
    return blogPosts
      .map((post) => bySlug.get(post.slug))
      .filter((i): i is SearchableItem => Boolean(i))
      .slice(0, FRESH_POSTS_COUNT);
  }, [items, blogPosts]);

  const typeCounts = useMemo(() => groupResults(items), [items]);

  // Стартовое состояние: сразу ставим курсор в поле (только на десктопе,
  // чтобы на телефоне клавиатура не закрывала подсказки).
  useEffect(() => {
    if (!router.isReady) return;
    const q = typeof router.query.query === "string" ? router.query.query : "";
    if (q) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
    // Только при первом готовом рендере.
  }, [router.isReady]);

  // Высота фиксированного хедера: к ней прилипает поле поиска на мобильных.
  const [stickyTop, setStickyTop] = useState(64);
  useEffect(() => {
    const sync = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) setStickyTop(Math.round(navbar.getBoundingClientRect().height));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const highlightRe = useMemo(() => buildHighlightRegExp(query), [query]);

  const grouped = useMemo(
    () => groupResults(results.map((r) => r.item)),
    [results],
  );

  // Категории блога в текущей выдаче: только те, где есть результаты,
  // от самой наполненной к самой пустой (при равенстве — по алфавиту).
  const blogCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of grouped.blog) {
      if (item.category) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return Array.from(counts, ([name, count]) => ({ name, count })).sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name),
    );
  }, [grouped]);
  // Категория из URL, которой нет в новой выдаче, молча сбрасывается на «All».
  const effectiveCategory =
    activeCategory && blogCategories.some((c) => c.name === activeCategory)
      ? activeCategory
      : null;

  // Порядок групп во вкладке «All»: по лучшему score внутри группы.
  // Fuse уже отдаёт результаты по возрастанию score, поэтому
  // достаточно запомнить порядок первого появления каждого типа.
  const groupOrder = useMemo(() => {
    const order: SearchGroup[] = [];
    for (const r of results) {
      const group = SEARCH_GROUP_OF[r.item.type];
      if (!order.includes(group)) order.push(group);
    }
    return order;
  }, [results]);

  const totalFound = results.length;

  // Top results: до трёх почти точных совпадений (score Fuse ≤ TOP_SCORE, 0 = идеально).
  // Показываем, только когда выдача достаточно большая, иначе блок дублирует список.
  const topResults = useMemo(() => {
    if (results.length <= TOP_MIN_TOTAL) return [];
    return results
      .filter((r) => (r.score ?? 1) <= TOP_SCORE)
      .slice(0, TOP_COUNT)
      .map((r) => r.item);
  }, [results]);
  const topKeys = useMemo(
    () => new Set(topResults.map((i) => `${i.type}-${i.slug}`)),
    [topResults],
  );

  // Если во вкладке из URL нет результатов по новому запросу — показываем «All».
  const effectiveTab: SearchTab =
    activeTab !== "all" && grouped[activeTab].length === 0 ? "all" : activeTab;

  // Пустые табы не показываем совсем: серый «Bundles 0» только занимает место
  // и выглядит как сломанная кнопка. «All» и активный таб видны всегда.
  const tabs: { id: SearchTab; label: string; count: number }[] = [
    { id: "all" as SearchTab, label: "All", count: totalFound },
    ...SEARCH_GROUP_ORDER.map((group) => ({
      id: group as SearchTab,
      label: SEARCH_GROUP_LABELS[group],
      count: grouped[group].length,
    })),
  ].filter((t) => t.id === "all" || t.id === effectiveTab || t.count > 0);
  const enabledTabs = tabs.map((t) => t.id);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = enabledTabs.indexOf(effectiveTab);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % enabledTabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + enabledTabs.length) % enabledTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = enabledTabs.length - 1;
    const tab = enabledTabs[next];
    selectTab(tab);
    tabRefs.current[tab]?.focus();
  };
  const showEmptyState = isReady && query.trim().length < 2;
  // Запрос есть, но Fuse ещё грузится: показываем скелетон, а не «No results».
  const searchPending = isReady && !showEmptyState && !fuseReady;
  const showNoResults = isReady && !showEmptyState && fuseReady && totalFound === 0;
  const showResults = isReady && !showEmptyState && fuseReady && !showNoResults;

  // Есть запрос: крупный H1 прячем визуально, чтобы выдача поднялась выше.
  const hasQuery = isReady && !showEmptyState;
  const trimmedQuery = query.trim();
  const pageHeading = !isReady
    ? "Search"
    : showEmptyState
      ? "Search Setproduct"
      : showNoResults
        ? `No results for “${trimmedQuery}”`
        : `Results for “${trimmedQuery}”`;
  const pageTitle =
    isReady && !showEmptyState
      ? `${pageHeading} | Setproduct`
      : meta.title;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    setQuery(trimmed);
    const nextQuery = { ...router.query };
    if (trimmed) {
      nextQuery.query = trimmed;
    } else {
      delete nextQuery.query;
    }
    router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta content={meta.description} name="description" />
        <meta content="noindex" name="robots" />
        <meta content={meta.title} property="og:title" />
        <meta content={meta.title} property="twitter:title" />
        <link href={meta.canonical} rel="canonical" />
      </Head>
      <SiteHeader blogPosts={blogPosts} />
      <main className="mt-22.5">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className={`section-padding ${hasQuery ? "top-40" : "top-80"} bottom-80`}>
            <div className="container">
              <div className="freebies_rich-text-component">
                <h1 className={hasQuery ? "sr-only" : "heading-style-h1 break-words"}>{pageHeading}</h1>
                {!hasQuery && <div className="spacer-40" />}
                {/* На мобильных поле прилипает под фиксированным хедером. */}
                <div
                  className="sticky md:static z-10 bg-(--white) -mx-4 px-4 py-3 md:m-0 md:p-0"
                  style={{ top: stickyTop }}
                >
                <form
                  action="/search"
                  className="search w-form"
                  onSubmit={onSubmit}
                  role="search"
                >
                  <label htmlFor="search-page-input" className="sr-only">
                    Search UI kits, templates, freebies, and blog posts
                  </label>
                  <input
                    ref={inputRef}
                    aria-controls="search-results"
                    autoComplete="off"
                    className="text-input is-nav-search is-page-search w-input pr-12 [&::-webkit-search-cancel-button]:appearance-none"
                    enterKeyHint="search"
                    id="search-page-input"
                    maxLength={256}
                    name="query"
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={loadFuse}
                    onKeyDown={(e) => {
                      if (e.key === "Escape" && inputValue) {
                        e.preventDefault();
                        clearInput();
                      }
                    }}
                    placeholder="Search UI kits, templates, articles…"
                    type="search"
                    value={inputValue}
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={clearInput}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer opacity-60 hover:opacity-100 hover:bg-(--light-primary) focus-visible:outline-2 focus-visible:outline-(--primary)"
                    >
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                  <input
                    className="hide w-button"
                    type="submit"
                    value="Search"
                  />
                  <div className="search-icon-wr">
                    <img
                      alt=""
                      className="search-icon"
                      loading="lazy"
                      src="/images/search.svg"
                    />
                  </div>
                </form>
                </div>
                <div className="spacer-24" />

                {(!isReady || searchPending) && (
                  <div aria-busy="true" aria-label="Loading results">
                    <div className="h-5 w-64 max-w-full rounded bg-gray-100 animate-pulse" />
                    <div className="spacer-40" />
                    <ul className="list-none p-0! m-0! grid gap-5">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="w-18 h-18 md:w-32 md:h-24 radius-12 shrink-0 bg-gray-100 animate-pulse" />
                          <div className="flex-1 min-w-0 grid gap-2">
                            <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
                            <div className="h-5 w-3/4 rounded bg-gray-100 animate-pulse" />
                            <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showEmptyState && (
                  <div>
                    <p className="text-size-regular is-mob-14">
                      {query.trim().length === 1
                        ? "Type at least 2 characters to start searching."
                        : `Search across ${items.length} items: ${typeCounts.blog.length} blog posts, plus UI kits, freebies and bundles.`}
                    </p>
                    <div className="spacer-40" />
                    <SuggestionChips label="Popular searches" />
                    <div className="spacer-40" />
                    <nav aria-label="Browse by type">
                      <h2 className="subtitle-all-caps mt-0">Browse by type</h2>
                      <div className="spacer-16" />
                      <ul className="list-none p-0! m-0! grid grid-cols-2 md:grid-cols-5 gap-3">
                        {BROWSE_LINKS.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex flex-col gap-1 h-full radius-16 p-4 no-underline text-inherit bg-(--light-purple)! border border-(--light-primary) hover:border-(--primary) transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
                            >
                              <span className="text-size-regular text-weight-semibold transition-colors duration-300 group-hover:text-(--primary) group-focus-visible:text-(--primary)">
                                {link.label}
                              </span>
                              {link.type && (
                                <span className="text-size-tiny opacity-60">
                                  {typeCounts[link.type].length} items
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {showNoResults && (
                  <div>
                    <p className="text-size-regular is-mob-14">
                      Nothing matched <strong>&ldquo;{query}&rdquo;</strong>. Check the
                      spelling, try a shorter phrase, or pick one of the options below.
                    </p>
                    {didYouMean.length > 0 && (
                      <>
                        <div className="spacer-16" />
                        <p className="text-size-regular">
                          Did you mean{" "}
                          {didYouMean.map((s, i) => (
                            <span key={s}>
                              {i > 0 && (i === didYouMean.length - 1 ? " or " : ", ")}
                              <Link
                                href={{ pathname: "/search", query: { query: s } }}
                                shallow
                                scroll={false}
                                className="text-weight-semibold text-(--primary)"
                              >
                                {s}
                              </Link>
                            </span>
                          ))}
                          ?
                        </p>
                      </>
                    )}
                    <div className="spacer-40" />
                    <SuggestionChips label="Popular searches" />
                    {freshPosts.length > 0 && (
                      <>
                        <div className="spacer-40" />
                        <section>
                          <h2 className="subtitle-all-caps mt-0">Fresh from the blog</h2>
                          <div className="spacer-16" />
                          <ul className="list-none p-0! m-0! grid gap-5">
                            {freshPosts.map((item) => (
                              <ResultRow key={item.slug} item={item} re={null} />
                            ))}
                          </ul>
                        </section>
                      </>
                    )}
                    {popularKits.length > 0 && (
                      <>
                        <div className="spacer-40" />
                        <section>
                          <h2 className="subtitle-all-caps mt-0">Popular UI kits</h2>
                          <div className="spacer-16" />
                          <ul className="list-none p-0! m-0! grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
                            {popularKits.map((item) => (
                              <TopResultCard key={item.slug} item={item} re={null} />
                            ))}
                          </ul>
                        </section>
                      </>
                    )}
                    <div className="spacer-40" />
                    <div className="radius-16 p-6 bg-(--light-purple) border border-(--light-primary) flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
                      <p className="text-size-regular m-0">
                        Still can&rsquo;t find it? Tell us what you need, and we&rsquo;ll point
                        you to the right kit.
                      </p>
                      <button
                        type="button"
                        onClick={openContactModal}
                        className="button secondary w-inline-block cursor-pointer shrink-0"
                      >
                        <div className="text-size-large text-weight-bold">Contact us</div>
                      </button>
                    </div>
                  </div>
                )}

                <p aria-live="polite" role="status" className="sr-only">
                  {showResults
                    ? `${totalFound} result${totalFound === 1 ? "" : "s"} for ${query}`
                    : showNoResults
                      ? `No results for ${query}`
                      : ""}
                </p>

                {showResults && (
                  <div id="search-results">
                    <p className="text-size-regular is-mob-14">
                      Found <strong>{totalFound}</strong> result
                      {totalFound === 1 ? "" : "s"} for{" "}
                      <strong>&ldquo;{query}&rdquo;</strong>
                    </p>
                    <div className="spacer-12" />

                    {/* На мобильных вкладки прокручиваются по горизонтали. */}
                    <div
                      role="tablist"
                      aria-label="Filter results by type"
                      className="flex gap-2 overflow-x-auto whitespace-nowrap -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {tabs.map((tab) => {
                        const selected = tab.id === effectiveTab;
                        return (
                          <button
                            key={tab.id}
                            ref={(el) => {
                              tabRefs.current[tab.id] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`search-tab-${tab.id}`}
                            aria-selected={selected}
                            aria-controls="search-tabpanel"
                            tabIndex={selected ? 0 : -1}
                            onClick={() => selectTab(tab.id)}
                            onKeyDown={onTabKeyDown}
                            className={`blog_list-filters-item shrink-0 border-0 m-0! text-inherit outline-none focus-visible:ring-2 focus-visible:ring-(--primary)${selected ? " fs-cmsfilter_active" : ""}`}
                          >
                            <span className="text-size-regular">
                              {tab.label}{" "}
                              <span className="font-normal opacity-60">{tab.count}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="spacer-40" />

                    <div
                      role="tabpanel"
                      id="search-tabpanel"
                      aria-labelledby={`search-tab-${effectiveTab}`}
                    >
                      {effectiveTab === "all" && topResults.length > 0 && (
                        <section>
                          <h2 className="subtitle-all-caps mt-0">Top results</h2>
                          <div className="spacer-16" />
                          <ul className="list-none p-0! m-0! grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                            {topResults.map((item) => (
                              <TopResultCard
                                key={`top-${item.type}-${item.slug}`}
                                item={item}
                                re={highlightRe}
                              />
                            ))}
                          </ul>
                        </section>
                      )}
                      {effectiveTab === "all" ? (
                        groupOrder
                          .map((type) => {
                            const group = grouped[type];
                            // Элементы из Top results не повторяем в превью группы,
                            // но счётчик и «See all» остаются по полной группе.
                            const rest = group.filter(
                              (item) => !topKeys.has(`${item.type}-${item.slug}`),
                            );
                            return { type, group, rest };
                          })
                          .filter(({ rest }) => rest.length > 0)
                          .map(({ type, group, rest }, index) => {
                          const visible = rest.slice(0, ALL_GROUP_PREVIEW);
                          const hidden = rest.length - visible.length;
                          // Отступ между блоками выдачи — spacer-40 (шкала Webflow),
                          // только перед блоком, у которого есть сосед сверху.
                          const hasBlockAbove = index > 0 || topResults.length > 0;

                          return (
                            <Fragment key={type}>
                            {hasBlockAbove && <div className="spacer-40" />}
                            <section>
                              <h2 className="subtitle-all-caps flex items-baseline gap-2 mt-0">
                                {SEARCH_GROUP_LABELS[type]}
                                <span className="font-normal opacity-60">
                                  ({group.length})
                                </span>
                              </h2>
                              <div className="spacer-16" />
                              <ul className="list-none p-0! m-0! grid gap-5">
                                {visible.map((item) => (
                                  <ResultRow
                                    key={`${item.type}-${item.slug}`}
                                    item={item}
                                    re={highlightRe}
                                  />
                                ))}
                              </ul>
                              {hidden > 0 && (
                                <>
                                  <div className="spacer-16" />
                                  <button
                                    type="button"
                                    onClick={() => selectTab(type)}
                                    className="text-size-small text-weight-semibold p-0 bg-transparent border-0 cursor-pointer text-(--primary) hover:underline"
                                  >
                                    See all {group.length} in {SEARCH_GROUP_LABELS[type]} →
                                  </button>
                                </>
                              )}
                            </section>
                            </Fragment>
                          );
                        })
                      ) : (
                        (() => {
                          const isBlog = effectiveTab === "blog";
                          const list =
                            isBlog && effectiveCategory
                              ? grouped.blog.filter((item) => item.category === effectiveCategory)
                              : grouped[effectiveTab];
                          const visible = list.slice(0, visibleCount);
                          const remaining = list.length - visible.length;
                          // Чипы нужны, только если есть из чего выбирать.
                          const showCategoryChips = isBlog && blogCategories.length > 1;
                          const chipClass = (active: boolean) =>
                            `blog_list-filters-item shrink-0 border-0 m-0! text-inherit cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-(--primary)${active ? " fs-cmsfilter_active" : ""}`;
                          return (
                            <section>
                              <h2 className="sr-only">
                                {SEARCH_GROUP_LABELS[effectiveTab]}
                              </h2>
                              {showCategoryChips && (
                                <>
                                  <div
                                    role="group"
                                    aria-label="Filter blog posts by category"
                                    className="flex flex-wrap gap-2"
                                  >
                                    <button
                                      type="button"
                                      aria-pressed={effectiveCategory === null}
                                      onClick={() => selectCategory(null)}
                                      className={chipClass(effectiveCategory === null)}
                                    >
                                      <span className="text-size-small">
                                        All topics{" "}
                                        <span className="font-normal opacity-60">
                                          {grouped.blog.length}
                                        </span>
                                      </span>
                                    </button>
                                    {blogCategories.map((cat) => (
                                      <button
                                        key={cat.name}
                                        type="button"
                                        aria-pressed={effectiveCategory === cat.name}
                                        onClick={() => selectCategory(cat.name)}
                                        className={chipClass(effectiveCategory === cat.name)}
                                      >
                                        <span className="text-size-small">
                                          {cat.name}{" "}
                                          <span className="font-normal opacity-60">
                                            {cat.count}
                                          </span>
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                  <div className="spacer-24" />
                                </>
                              )}
                              <ul className="list-none p-0! m-0! grid gap-5">
                                {visible.map((item) => (
                                  <ResultRow
                                    key={`${item.type}-${item.slug}`}
                                    item={item}
                                    re={highlightRe}
                                  />
                                ))}
                              </ul>
                              {remaining > 0 && (
                                <>
                                  <div className="spacer-40" />
                                  <button
                                    type="button"
                                    onClick={() => setVisibleCount((c) => c + TYPE_PAGE_SIZE)}
                                    className="button secondary w-inline-block cursor-pointer"
                                  >
                                    <div className="text-size-large text-weight-bold">
                                      Show {Math.min(TYPE_PAGE_SIZE, remaining)} more
                                    </div>
                                  </button>
                                </>
                              )}
                            </section>
                          );
                        })()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
