import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { labs } from "@/lib/labs";

export default function LabPage() {
  return (
    <main className="page">
      <section className="shell page-hero">
        <span className="eyebrow">Lab</span>
        <h1 className="section-title">구현하면서 헷갈렸던 지점을 작게 분해하는 실험실.</h1>
        <p className="section-copy">
          앱과 웹을 만들면서 자주 부딪히는 gesture, render, navigation, network feedback을
          작은 단위로 나눠 정리합니다. 단순 데모보다 왜 그런 구조가 필요한지 설명하는 공간입니다.
        </p>
      </section>
      <section className="shell lab-grid">
        {labs.map((lab, index) => (
          <article className="lab-card card" key={lab.title}>
            <div className="lab-preview">
              <span />
              <span />
              <span />
              <div style={{ transform: `translateX(${index * 18}px)` }} />
            </div>
            <div className="lab-body">
              <div className="lab-body-top">
                <lab.icon size={22} />
                <ArrowUpRight size={18} />
              </div>
              <h2>{lab.title}</h2>
              <strong>{lab.question}</strong>
              <p>{lab.body}</p>
              <div className="lab-detail">
                <span>What I learned</span>
                <p>{lab.detail}</p>
              </div>
              <div className="tag-row">
                {lab.learned.map((tag) => (
                  <span className="pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link className="lab-link" href={`/lab/${lab.slug}`}>
                자세히 보기 <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
