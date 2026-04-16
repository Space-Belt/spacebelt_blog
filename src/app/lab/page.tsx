import { ArrowUpRight } from "lucide-react";

const labs = [
  {
    title: "Gesture Sheet",
    body: "React Native 바텀시트의 감각을 웹에서 다시 구현하는 실험.",
    tags: ["Drag", "Spring", "Mobile UI"]
  },
  {
    title: "Render Cost Meter",
    body: "상태 변경이 컴포넌트 트리에 미치는 영향을 시각적으로 추적하는 데모.",
    tags: ["React", "Performance"]
  },
  {
    title: "Motion Route",
    body: "페이지 전환을 정보 구조와 연결해 움직임의 이유를 만드는 실험.",
    tags: ["Framer Motion", "Navigation"]
  }
];

export default function LabPage() {
  return (
    <main className="page">
      <section className="shell page-hero">
        <span className="eyebrow">Lab</span>
        <h1 className="section-title">인터랙션을 직접 만져볼 수 있는 작은 실험실.</h1>
        <p className="section-copy">
          포트폴리오에서 말로 설명하기 어려운 UI 감각, 애니메이션, 렌더링 구조를 짧은 데모로
          쌓아가는 공간입니다.
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
              <ArrowUpRight size={20} />
              <h2>{lab.title}</h2>
              <p>{lab.body}</p>
              <div className="tag-row">
                {lab.tags.map((tag) => (
                  <span className="pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
