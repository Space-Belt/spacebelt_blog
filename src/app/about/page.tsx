import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getAiPosts, getBlogPosts, getProjects } from "@/lib/content";

const principles = [
  "화면을 만들기 전에 필요한 상태와 데이터 흐름을 먼저 정리합니다.",
  "React Native에서 네이티브 설정이 필요한 부분도 하나씩 확인하며 작업합니다.",
  "기능을 구현한 뒤에는 로그, 빌드, 실제 화면으로 다시 확인합니다.",
  "막혔던 문제와 공부한 내용은 나중에 다시 보기 위해 글로 남깁니다."
];

const stackGroups = [
  {
    title: "Web",
    items: ["React", "Next.js", "TypeScript", "Admin Web", "Responsive UI"]
  },
  {
    title: "Mobile",
    items: ["React Native CLI", "Expo", "Reanimated", "Gesture Handler", "TurboModule"]
  },
  {
    title: "Product",
    items: ["Firebase", "Firestore", "FCM", "OCR", "Mixpanel", "Firebase Analytics"]
  }
];

export default function AboutPage() {
  const stats = [
    { label: "정리한 기술 글", value: `${getBlogPosts().length}` },
    { label: "AI 활용 기록", value: `${getAiPosts().length}` },
    { label: "프로젝트 케이스", value: `${getProjects().length}` }
  ];

  return (
    <main className="page">
      <section className="shell about-hero">
        <div>
          <span className="eyebrow">About</span>
          <h1 className="section-title">React Native와 React로 앱과 웹을 만들어온 개발자.</h1>
          <p className="section-copy">
            앱, 웹, 관리자 화면을 작업하면서 인증, 게시판, OCR, FCM, Analytics, 네이티브 모듈을
            경험했습니다. 아직 더 배울 것이 많지만, 맡은 기능을 끝까지 확인하고 기록하려고 합니다.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/projects">
              프로젝트 보기 <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" href="/blog">
              글 읽기
            </Link>
          </div>
        </div>
        <div className="about-snapshot card">
          {stats.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="shell about-section-grid">
        <div className="about-panel card">
          <span className="eyebrow">Principles</span>
          <h2>작업할 때 지키는 기준.</h2>
          <div className="principle-list">
            {principles.map((item) => (
              <p key={item}>
                <CheckCircle2 size={18} />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="about-panel card">
          <span className="eyebrow">Now</span>
          <h2>지금 집중하는 것.</h2>
          <p>
            FETE, EVAN, 똑구, OPENME처럼 앱 기능이 중심인 프로젝트를 정리하고 있습니다.
            기술을 많이 나열하기보다 어떤 기능을 맡았고, 어떤 부분에서 막혔고, 어떻게 확인했는지
            보이도록 포트폴리오를 다듬고 있습니다.
          </p>
        </div>
      </section>

      <section className="shell section-block">
        <span className="eyebrow">Toolbox</span>
        <div className="about-stack-grid">
          {stackGroups.map((group) => (
            <article className="about-stack-card card" key={group.title}>
              <h2>{group.title}</h2>
              <div className="tag-row">
                {group.items.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
