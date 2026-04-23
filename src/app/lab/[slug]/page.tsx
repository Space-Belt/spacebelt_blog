import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getLab, labs } from "@/lib/labs";

type LabDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return {};

  return {
    title: `${lab.title} | Spacebelt Lab`,
    description: lab.question
  };
}

export default async function LabDetailPage({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <main className="page">
      <article className="shell lab-detail-page">
        <Link className="button secondary" href="/lab">
          <ArrowLeft size={18} /> Lab으로 돌아가기
        </Link>
        <header>
          <span className="eyebrow">Lab Detail</span>
          <h1>{lab.title}</h1>
          <p>{lab.question}</p>
          <div className="tag-row">
            {lab.tags.map((tag) => (
              <span className="pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="lab-detail-summary card">
          <strong>Experiment Note</strong>
          <p>{lab.body}</p>
          <p>{lab.detail}</p>
          <Link className="lab-source-link" href={lab.source.href}>
            {lab.source.label}: {lab.source.title}
          </Link>
        </section>

        <section className="lab-detail-sections">
          <div className="card">
            <h2>작업 중 확인한 것</h2>
            <ul>
              {lab.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2>트레이드오프</h2>
            <ul>
              {lab.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2>다음 개선</h2>
            <ul>
              {lab.next.map((next) => (
                <li key={next}>{next}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lab-detail-longform">
          {lab.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
