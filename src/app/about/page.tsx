import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Database, GitBranch, ShieldCheck } from "lucide-react";
import { getAiPosts, getBlogPosts, getProjects } from "@/lib/content";

const principles = [
  "화면을 만들기 전에 필요한 상태와 데이터 흐름을 먼저 정리합니다.",
  "React Native에서 네이티브 설정이 필요한 부분도 하나씩 확인하며 작업합니다.",
  "AI에게 맡길 일은 목표, context, 제약, 완료 기준으로 나누어 전달합니다.",
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
          <h2>AI를 작업 흐름에 넣는 법.</h2>
          <p>
            FETE, EVAN, 똑구, OPENME처럼 앱 기능이 중심인 프로젝트를 정리하면서 Codex와
            Claude Code를 함께 사용합니다. 단순히 코드를 생성하는 용도가 아니라, 코드베이스 탐색,
            구현 후보 비교, 테스트 관점 정리, 기술 글 초안화에 활용합니다.
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
