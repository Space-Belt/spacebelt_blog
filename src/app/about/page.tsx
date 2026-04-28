import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Database, GitBranch, ShieldCheck } from "lucide-react";
import { getAiPosts, getBlogPosts, getProjects } from "@/lib/content";

const principles = [
  "제품에서 해결해야 할 문제와 사용자 흐름을 먼저 정리합니다.",
  "화면, 상태, 데이터, 운영 흐름이 끊기지 않도록 기능을 연결합니다.",
  "React Native에서 네이티브 설정과 빌드 환경까지 확인하며 작업합니다.",
  "AI에게 맡길 일은 목표, context, 제약, 완료 기준으로 나누어 전달합니다.",
  "생성된 결과는 diff, 빌드, 실제 화면으로 검증한 뒤 반영합니다."
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
  },
  {
    title: "AI Workflow",
    items: ["Codex", "Claude Code", "RAG", "MCP", "Skills", "Code Review"]
  }
];

const aiOperatingModel = [
  {
    icon: Database,
    title: "근거 기반 사용",
    body: "RAG와 context를 구분해 필요한 문서, 코드, 로그만 붙이고 AI가 추측하는 영역을 줄입니다."
  },
  {
    icon: GitBranch,
    title: "작은 단위 위임",
    body: "화면 전체를 한 번에 맡기기보다 컴포넌트, 버그, 테스트, 글 초안처럼 책임 범위를 좁힙니다."
  },
  {
    icon: ShieldCheck,
    title: "검증 후 반영",
    body: "AI가 만든 결과는 diff, 타입, 빌드, 실제 화면으로 확인하고 이해한 코드만 남깁니다."
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
          <h1 className="section-title">제품 개발의 흐름을 이해하는 프론트엔드 개발자.</h1>
          <p className="section-copy">
            React Native와 React 기반으로 모바일 앱, 관리자 웹, 서비스 화면을 개발했습니다.
            기획부터 개발, 배포, 운영까지 이어지는 흐름 안에서 맡은 기능을 구현하고, AI 도구를
            활용해 문제 해결 속도와 검증의 정확도를 높이고 있습니다.
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
          <h2>AI를 작업 흐름에 넣는 법.</h2>
          <p>
            AI 도구를 단순한 코드 생성기가 아니라, 문제 분석과 구현 방향 비교, 코드 작성, 리뷰
            후보 도출, 학습 리소스 정리에 활용합니다. 결과는 그대로 받아들이지 않고 코드와 화면,
            빌드 결과를 기준으로 다시 검증합니다.
          </p>
        </div>
      </section>

      <section className="shell section-block about-ai-band">
        <div className="about-ai-heading">
          <Bot size={28} />
          <div>
            <span className="eyebrow">AI Operating Model</span>
            <h2>AI를 제대로 쓰기 위한 개인 작업 기준.</h2>
          </div>
        </div>
        <div className="about-ai-grid">
          {aiOperatingModel.map((item) => (
            <article className="card" key={item.title}>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
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
