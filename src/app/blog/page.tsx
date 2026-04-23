import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/content";

export default function BlogPage() {
  const posts = getBlogPosts().map(({ content, readingMinutes, date, ...post }) => post);

  return (
    <main className="page">
      <section className="shell page-hero">
        <span className="eyebrow">Blog</span>
        <h1 className="section-title">프론트엔드의 동작 원리를 내 언어로 정리합니다.</h1>
        <p className="section-copy">
          React, React Native, JavaScript 기본기와 함께 프론트엔드 개발자가 알아야 할 CS, OS,
          네트워크 지식을 실제 UI 문제와 연결해서 정리합니다.
        </p>
      </section>
      <BlogIndex posts={posts} />
    </main>
  );
}
