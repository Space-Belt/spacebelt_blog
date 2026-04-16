import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/content";

export default function BlogPage() {
  const posts = getBlogPosts().map(({ content, readingMinutes, date, ...post }) => post);

  return (
    <main className="page">
      <section className="shell page-hero">
        <span className="eyebrow">Blog</span>
        <h1 className="section-title">보여줄 만한 학습 기록만 남깁니다.</h1>
        <p className="section-copy">
          React, React Native, JavaScript 기본기, 실제 문제 해결 기록을 중심으로 정리했습니다.
          단순 메모보다 개발 역량을 설명할 수 있는 글만 추렸습니다.
        </p>
      </section>
      <BlogIndex posts={posts} />
    </main>
  );
}
