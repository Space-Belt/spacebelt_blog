import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { getAiPost, getAiPosts } from "@/lib/content";

type AiPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAiPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: AiPostPageProps) {
  const { slug } = await params;
  const post = getAiPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | AI Deep Dive`,
    description: post.description
  };
}

export default async function AiPostPage({ params }: AiPostPageProps) {
  const { slug } = await params;
  const post = getAiPost(slug);
  if (!post) notFound();

  return (
    <main className="page">
      <article className="shell article">
        <header>
          <span className="eyebrow">
            {post.tool} · {post.level} · {post.readingMinutes}
          </span>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="prose">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}
