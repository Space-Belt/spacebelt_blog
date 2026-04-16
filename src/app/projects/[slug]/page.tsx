import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { getProject, getProjects } from "@/lib/content";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Spacebelt`,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="page detail-page">
      <section className="shell detail-hero">
        <div>
          <span className="eyebrow">{project.type}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="tag-row">
            {project.stack.map((tag) => (
              <span className="pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-cover card">
          <Image src={project.cover} alt="" fill sizes="(max-width: 900px) 100vw, 42vw" />
        </div>
      </section>
      <section className="shell detail-layout">
        <aside className="detail-aside">
          <div>
            <span>Role</span>
            <strong>{project.role}</strong>
          </div>
          {project.impact.map((item) => (
            <div key={item}>
              <span>Impact</span>
              <strong>{item}</strong>
            </div>
          ))}
        </aside>
        <article className="prose">
          <MDXRemote source={project.content} components={mdxComponents} />
        </article>
      </section>
    </main>
  );
}
