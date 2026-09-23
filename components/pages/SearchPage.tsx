"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import {
  SEARCHABLE_TYPE_BADGES,
  SEARCHABLE_TYPE_LABELS,
  SEARCHABLE_TYPE_ORDER,
  type SearchableItem,
  type SearchableType,
} from "../../lib/search/types";
import { SEARCH_KEYS, buildFuseQuery } from "../../lib/search/synonyms";
import {
  buildHighlightRegExp,
  buildSnippet,
  splitByMatches,
} from "../../lib/search/highlight";
import { SEARCH_SUGGESTIONS } from "../../data/search-suggestions";
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

type SearchTab = "all" | SearchableType;

function parseTab(value: unknown): SearchTab {
  if (typeof value !== "string") return "all";
  return (SEARCHABLE_TYPE_ORDER as readonly string[]).includes(value)
    ? (value as SearchableType)
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
    <li className="group">
      <Link
        href={item.url}
        className="flex gap-4 items-start no-underline text-inherit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-4"
      >
        <div className="w-32 h-24 rounded-lg shrink-0 overflow-hidden bg-(--light-primary)">
          {item.image ? (
            <img
              alt=""
              loading="lazy"
              src={item.image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <p className="text-xl! font-semibold! leading-5! text-style-2lines m-0 group-hover:text-(--primary) transition-colors duration-300">
            <Highlight text={item.title} re={re} />
          </p>
          <p className="text-size-small text-style-2lines mt-1 mb-0 opacity-80">
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
    <li className="group">
      <Link
        href={item.url}
        className="flex md:flex-col gap-4 md:gap-3 items-start no-underline text-inherit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-4"
      >
        <div className="w-32 h-24 md:w-full md:h-auto md:aspect-video rounded-lg shrink-0 overflow-hidden bg-(--light-primary)">
          {item.image ? (
            <img
              alt=""
              loading="lazy"
              src={item.image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <p className="text-xl! font-semibold! leading-6! text-style-2lines m-0 group-hover:text-(--primary) transition-colors duration-300">
            <Highlight text={item.title} re={re} />
          </p>
        </div>
      </Link>
    </li>
  );
}

function groupResults(results: SearchableItem[]): Record<SearchableType, SearchableItem[]> {
  const grouped = {
    product: [],
    template: [],
    bundle: [],
    freebie: [],
    dashboard: [],
    blog: [],
  } as Record<SearchableType, SearchableItem[]>;

  for (const item of results) {
    grouped[item.type].push(item);
  }
  return grouped;
}

export default function SearchPage({ items, blogPosts = [] }: Props) {
  const meta = PAGE_META[SLUG];
  const breadcrumbs = PAGE_BREADCRUMBS[SLUG] ?? [];
  const router = useRouter();

  const initialQuery =
    typeof router.query.query === "string" ? router.query.query : "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const tabRefs = useRef<Partial<Record<SearchTab, HTMLButtonElement | null>>>({});

  // Активная вкладка живёт в URL (?type=), чтобы ссылкой можно было поделиться.
  const activeTab = parseTab(router.query.type);

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

  // Новый запрос или другая вкладка — начинаем список сначала.
  useEffect(() => {
    setVisibleCount(TYPE_PAGE_SIZE);
  }, [query, activeTab]);

  const selectTab = (tab: SearchTab) => {
    const nextQuery = { ...router.query };
    if (tab === "all") {
      delete nextQuery.type;
    } else {
      nextQuery.type = tab;
    }
    router.push(
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

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: SEARCH_KEYS.map((k) => ({ ...k })),
        // Каждое слово ищется отдельно, поэтому порог можно держать строже.
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [items],
  );

  const results = useMemo<FuseResult<SearchableItem>[]>(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    // Пословный поиск с синонимами: все слова обязательны,
    // каждое может совпасть в любом поле или через синоним.
    const expression = buildFuseQuery(trimmed);
    // Без limit: индекс небольшой, а счётчик должен быть честным.
    return expression ? fuse.search(expression) : fuse.search(trimmed);
  }, [fuse, query]);

  const highlightRe = useMemo(() => buildHighlightRegExp(query), [query]);

  const grouped = useMemo(
    () => groupResults(results.map((r) => r.item)),
    [results],
  );

  // Порядок групп во вкладке «All»: по лучшему score внутри группы.
  // Fuse уже отдаёт результаты по возрастанию score, поэтому
  // достаточно запомнить порядок первого появления каждого типа.
  const groupOrder = useMemo(() => {
    const order: SearchableType[] = [];
    for (const r of results) {
      if (!order.includes(r.item.type)) order.push(r.item.type);
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

  const tabs: { id: SearchTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: totalFound },
    ...SEARCHABLE_TYPE_ORDER.map((type) => ({
      id: type as SearchTab,
      label: SEARCHABLE_TYPE_LABELS[type],
      count: grouped[type].length,
    })),
  ];
  const enabledTabs = tabs.filter((t) => t.count > 0).map((t) => t.id);

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
  const showNoResults = isReady && !showEmptyState && totalFound === 0;
  const showResults = isReady && !showEmptyState && !showNoResults;

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
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="freebies_rich-text-component">
                <h1 className="heading-style-h1 break-words">{pageHeading}</h1>
                <div className="spacer-40" />
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
                <div className="h-5" />

                {!isReady && (
                  <div aria-busy="true" aria-label="Loading results">
                    <div className="h-5 w-64 max-w-full rounded bg-gray-100 animate-pulse" />
                    <div className="spacer-40" />
                    <ul className="list-none p-0 m-0 grid gap-5">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="w-32 h-24 rounded-lg shrink-0 bg-gray-100 animate-pulse" />
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
                      Type at least 2 characters to search across{" "}
                      {items.length} items: UI kits, templates, freebies, bundles,
                      and {items.filter((i) => i.type === "blog").length} blog posts.
                    </p>
                    <div className="spacer-24" />
                    <div className="flex flex-wrap gap-3">
                      {SEARCH_SUGGESTIONS.map(
                        (suggestion) => (
                          <Link
                            key={suggestion}
                            href={{ pathname: "/search", query: { query: suggestion } }}
                            shallow
                            scroll={false}
                            className="blog_list-filters-item cursor-pointer no-underline"
                          >
                            <span className="text-size-regular">{suggestion}</span>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {showNoResults && (
                  <div>
                    <p className="text-size-regular is-mob-14">
                      No matching results for <strong>&ldquo;{query}&rdquo;</strong>.
                    </p>
                    <div className="spacer-16" />
                    <p className="text-size-small">
                      Try different keywords, or browse{" "}
                      <Link href="/all">all products</Link>,{" "}
                      <Link href="/blog">the blog</Link>, or{" "}
                      <Link href="/freebies">freebies</Link>.
                    </p>
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
                    <div className="spacer-24" />

                    {/* На мобильных вкладки прокручиваются по горизонтали. */}
                    <div
                      role="tablist"
                      aria-label="Filter results by type"
                      className="flex gap-2 overflow-x-auto whitespace-nowrap -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {tabs.map((tab) => {
                        const selected = tab.id === effectiveTab;
                        const disabled = tab.count === 0;
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
                            disabled={disabled}
                            onClick={() => selectTab(tab.id)}
                            onKeyDown={onTabKeyDown}
                            className={`blog_list-filters-item shrink-0 border-0 m-0! text-inherit outline-none focus-visible:ring-2 focus-visible:ring-(--primary) disabled:opacity-40 disabled:cursor-default disabled:hover:text-inherit${selected ? " fs-cmsfilter_active" : ""}`}
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
                        <section className="mb-12">
                          <h2 className="subtitle-all-caps mt-0 mb-4">Top results</h2>
                          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
                        groupOrder.map((type) => {
                          const group = grouped[type];
                          // Элементы из Top results не повторяем в превью группы,
                          // но счётчик и «See all» остаются по полной группе.
                          const rest = group.filter(
                            (item) => !topKeys.has(`${item.type}-${item.slug}`),
                          );
                          if (rest.length === 0) return null;
                          const visible = rest.slice(0, ALL_GROUP_PREVIEW);
                          const hidden = rest.length - visible.length;

                          return (
                            <section key={type} className="mb-12">
                              <h2 className="subtitle-all-caps flex items-baseline gap-2 mt-0 mb-4">
                                {SEARCHABLE_TYPE_LABELS[type]}
                                <span className="font-normal opacity-60">
                                  ({group.length})
                                </span>
                              </h2>
                              <ul className="list-none p-0 m-0 grid gap-5">
                                {visible.map((item) => (
                                  <ResultRow
                                    key={`${item.type}-${item.slug}`}
                                    item={item}
                                    re={highlightRe}
                                  />
                                ))}
                              </ul>
                              {hidden > 0 && (
                                <button
                                  type="button"
                                  onClick={() => selectTab(type)}
                                  className="text-size-small text-weight-semibold mt-4 p-0 bg-transparent border-0 cursor-pointer text-(--primary) hover:underline"
                                >
                                  See all {group.length} in {SEARCHABLE_TYPE_LABELS[type]} →
                                </button>
                              )}
                            </section>
                          );
                        })
                      ) : (
                        (() => {
                          const list = grouped[effectiveTab];
                          const visible = list.slice(0, visibleCount);
                          const remaining = list.length - visible.length;
                          return (
                            <section>
                              <h2 className="sr-only">
                                {SEARCHABLE_TYPE_LABELS[effectiveTab]}
                              </h2>
                              <ul className="list-none p-0 m-0 grid gap-5">
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
