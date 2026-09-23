"use client";

import { useEffect, useMemo, useState } from "react";
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
import { SEARCH_SUGGESTIONS } from "../../data/search-suggestions";
import type { BlogPostPreview } from "../../types/data";

const SLUG = "search";
const MAX_RESULTS_PER_GROUP = 8;

type Props = {
  items: SearchableItem[];
  blogPosts?: BlogPostPreview[];
};

function ResultRow({ item }: { item: SearchableItem }) {
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
            {item.title}
          </p>
          <p className="text-size-small text-style-2lines mt-1 mb-0 opacity-80">
            {item.description}
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

  // Группы, которые пользователь раскрыл кнопкой «Show all».
  const [expandedGroups, setExpandedGroups] = useState<Set<SearchableType>>(
    () => new Set(),
  );

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

  // Новый запрос — сворачиваем раскрытые группы.
  useEffect(() => {
    setExpandedGroups(new Set());
  }, [query]);

  const expandGroup = (type: SearchableType) => {
    setExpandedGroups((prev) => new Set(prev).add(type));
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

  const grouped = useMemo(
    () => groupResults(results.map((r) => r.item)),
    [results],
  );

  const totalFound = results.length;
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
                    aria-controls="search-results"
                    autoComplete="off"
                    className="text-input is-nav-search is-page-search w-input"
                    enterKeyHint="search"
                    id="search-page-input"
                    maxLength={256}
                    name="query"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search UI kits, templates, articles…"
                    type="search"
                    value={inputValue}
                  />
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
                    <div className="spacer-40" />

                    {SEARCHABLE_TYPE_ORDER.map((type) => {
                      const group = grouped[type];
                      if (!group || group.length === 0) return null;
                      const visible = expandedGroups.has(type)
                        ? group
                        : group.slice(0, MAX_RESULTS_PER_GROUP);
                      const hidden = group.length - visible.length;

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
                              <ResultRow key={`${item.type}-${item.slug}`} item={item} />
                            ))}
                          </ul>
                          {hidden > 0 && (
                            <button
                              type="button"
                              onClick={() => expandGroup(type)}
                              className="text-size-small text-weight-semibold mt-4 p-0 bg-transparent border-0 cursor-pointer text-(--primary) hover:underline"
                            >
                              Show all {group.length} in {SEARCHABLE_TYPE_LABELS[type]} →
                            </button>
                          )}
                        </section>
                      );
                    })}
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
