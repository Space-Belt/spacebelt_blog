import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { getBlogPost, getBlogPosts } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Spacebelt Blog`,
    description: post.description
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="page">
      <article className="shell article">
        <header>
          <span className="eyebrow">Technical Note</span>
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
