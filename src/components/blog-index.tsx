"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

type BlogListPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

type BlogCategory = {
  id: string;
  label: string;
};

const categories: BlogCategory[] = [
  { id: "all", label: "전체" },
  { id: "react", label: "React" },
  { id: "react-native", label: "React Native" },
  { id: "javascript", label: "JavaScript" },
  { id: "troubleshooting", label: "문제 해결" }
];

const paths = [
  {
    title: "JavaScript 기본기",
    body: "실행 컨텍스트, 스코프, 호이스팅, 이벤트 제어처럼 React를 쓰기 전에 필요한 기반입니다.",
    category: "javascript"
  },
  {
    title: "React 화면 이해",
    body: "렌더링, React Query, CORS 같은 웹 프론트엔드에서 자주 만나는 흐름입니다.",
    category: "react"
  },
  {
    title: "React Native 앱 구조",
    body: "FlatList, Metro, New Architecture, FCM, 네이티브 광고 식별자까지 앱 개발에 가까운 기록입니다.",
    category: "react-native"
  }
];

function normalizedText(post: BlogListPost) {
  return [post.title, post.description, ...post.tags].join(" ").toLowerCase();
}

function getPostCategories(post: BlogListPost) {
  const text = normalizedText(post);
  const result = new Set<string>(["all"]);

  if (
    text.includes("react native") ||
    text.includes("reactnative") ||
    text.includes("rn") ||
    text.includes("flatlist") ||
    text.includes("sectionlist") ||
    text.includes("metro") ||
    text.includes("fcm") ||
    text.includes("idfa") ||
    text.includes("gaid") ||
    text.includes("reanimated")
  ) {
    result.add("react-native");
  }

  if (
    text.includes("javascript") ||
    text.includes("실행컨텍스트") ||
    text.includes("hoisting") ||
    text.includes("스코프") ||
    text.includes("throttle") ||
    text.includes("debounce") ||
    text.includes("dom")
  ) {
    result.add("javascript");
  }

  if (
    (text.includes("react") || text.includes("reactquery") || text.includes("react query")) &&
    !result.has("react-native")
  ) {
    result.add("react");
  }

  if (
    text.includes("error") ||
    text.includes("cors") ||
    text.includes("해결") ||
    text.includes("오류") ||
    text.includes("cannot be undefined")
  ) {
    result.add("troubleshooting");
  }

  return result;
}

export function BlogIndex({ posts }: { posts: BlogListPost[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const postsWithCategories = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        categories: getPostCategories(post)
      })),
    [posts]
  );

  const counts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = postsWithCategories.filter((post) =>
        post.categories.has(category.id)
      ).length;
      return acc;
    }, {});
  }, [postsWithCategories]);

  const visiblePosts = postsWithCategories.filter((post) => {
    const matchesCategory = post.categories.has(activeCategory);
    const keyword = query.trim().toLowerCase();
    const matchesQuery = !keyword || normalizedText(post).includes(keyword);
    return matchesCategory && matchesQuery;
  });
  const featuredPost = visiblePosts[0];
  const restPosts = visiblePosts.slice(1);

  return (
    <section className="shell blog-index page-grid">
      <div className="blog-path-grid">
        {paths.map((path) => (
          <button
            type="button"
            key={path.title}
            onClick={() => setActiveCategory(path.category)}
          >
            <strong>{path.title}</strong>
            <span>{path.body}</span>
          </button>
        ))}
      </div>

      <div className="blog-tabs" aria-label="Blog categories">
        {categories.map((category) => (
          <button
            className={activeCategory === category.id ? "active" : ""}
            type="button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.label}</span>
            <small>{counts[category.id] ?? 0}</small>
          </button>
        ))}
      </div>

      <div className="blog-toolbar">
        <label>
          <Search size={18} />
          <input
            placeholder="블로그 안에서 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <span>{visiblePosts.length}개 글</span>
      </div>

      {featuredPost ? (
        <Link
          className="blog-featured card"
          href={`/blog/${encodeURIComponent(featuredPost.slug)}`}
        >
          <span className="eyebrow">Featured Note</span>
          <h2>{featuredPost.title}</h2>
          <p>{featuredPost.description}</p>
          <div className="blog-card-footer">
            <div className="tag-row">
              {featuredPost.tags.slice(0, 4).map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <ArrowRight size={20} />
          </div>
        </Link>
      ) : null}

      <div className="blog-card-grid">
        {restPosts.map((post) => (
          <Link className="blog-card card" href={`/blog/${encodeURIComponent(post.slug)}`} key={post.slug}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="blog-card-footer">
              <div className="tag-row">
                {post.tags.slice(0, 3).map((tag) => (
                  <span className="pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>

      {!featuredPost ? (
        <div className="blog-empty card">
          <strong>조건에 맞는 글이 없습니다.</strong>
          <p>다른 탭이나 검색어로 다시 찾아보면 됩니다.</p>
        </div>
      ) : null}
    </section>
  );
}
