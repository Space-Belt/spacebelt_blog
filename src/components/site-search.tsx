"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/content";

type SiteSearchProps = {
  items: SearchItem[];
  variant?: "header" | "hero";
};

export function SiteSearch({ items, variant = "header" }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items.slice(0, 6);

    return items
      .filter((item) => {
        const haystack = [item.title, item.description, item.type, ...item.tags]
          .join(" ")
          .toLowerCase();
        return haystack.includes(keyword);
      })
      .slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isSearchShortcut) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        className={variant === "hero" ? "hero-search-button" : "search-button"}
        type="button"
        onClick={() => setOpen(true)}
      >
        <Search size={variant === "hero" ? 20 : 16} />
        <span>{variant === "hero" ? "글, 프로젝트, AI 사용법 검색" : "Search"}</span>
        {variant === "header" ? <kbd>⌘K</kbd> : null}
      </button>

      {open ? (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
          <button className="search-backdrop" type="button" onClick={() => setOpen(false)} />
          <div className="search-modal">
            <div className="search-input-row">
              <Search size={20} />
              <input
                autoFocus
                placeholder="JavaScript, Codex, React Native..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <X size={18} />
              </button>
            </div>
            <div className="search-results">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    className="search-result"
                    href={item.href}
                    key={`${item.type}-${item.href}`}
                    onClick={() => setOpen(false)}
                  >
                    <div>
                      <span>{item.type}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <small>{item.tags.slice(0, 3).join(" · ")}</small>
                  </Link>
                ))
              ) : (
                <div className="search-empty">
                  <strong>검색 결과가 없습니다.</strong>
                  <p>다른 키워드로 다시 찾아보면 됩니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
