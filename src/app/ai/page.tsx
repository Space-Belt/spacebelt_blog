import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  FileSearch,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { getAiPosts } from "@/lib/content";

const practices = [
  {
    icon: BrainCircuit,
    title: "문제 정의",
    body: "AI에게 바로 코드를 맡기기보다, 요구사항과 제약을 먼저 정리합니다."
  },
  {
    icon: FileSearch,
    title: "근거 확인",
    body: "생성된 설명과 코드는 공식 문서, 런타임 동작, 테스트 결과로 다시 확인합니다."
  },
  {
    icon: Code2,
    title: "구현 보조",
    body: "반복 코드, 리팩터링 후보, 테스트 초안을 만들고 코드베이스 맥락으로 판단합니다."
  },
  {
    icon: Workflow,
    title: "학습 루프",
    body: "모르는 개념은 비유, 예제, 반례, 프로젝트 적용 순서로 다시 질문합니다."
  }
];

const tracks = [
  "Codex",
  "Claude Code",
  "RAG",
  "Context",
  "MCP",
  "Skills",
  "Code Review",
  "Automation"
];

const systemMap = [
  {
    icon: BrainCircuit,
    label: "Intent",
    title: "무엇을 끝낼지 먼저 정한다",
    body: "AI가 추측하지 않도록 목표, 범위, 완료 기준을 작은 작업 명세로 바꿉니다."
  },
  {
    icon: Database,
    label: "Context",
    title: "필요한 근거만 붙인다",
    body: "관련 파일, 에러 로그, 공식 문서, 디자인 기준처럼 이번 판단에 필요한 정보만 고릅니다."
  },
  {
    icon: GitBranch,
    label: "Draft",
    title: "후보를 빠르게 만든다",
    body: "구현안, 테스트 관점, 리팩터링 방향을 여러 개 뽑고 프로젝트 기준으로 비교합니다."
  },
  {
    icon: ShieldCheck,
    label: "Verify",
    title: "실행해서 남길 것만 고른다",
    body: "diff, 빌드, 테스트, 화면 동작을 확인해 AI 답변을 실제 코드 품질로 바꿉니다."
  }
];

const productivityLoops = [
  {
    title: "RAG",
    body: "AI가 기억만으로 답하지 않고, 문서나 코드 조각을 검색해 근거와 함께 답하게 만드는 방식입니다."
  },
  {
    title: "MCP",
    body: "Figma, 공식 문서, 브라우저, 로그 도구처럼 repo 밖의 정보를 AI가 읽을 수 있게 연결합니다."
  },
  {
    title: "Skills",
    body: "반복되는 글쓰기, 리뷰, 디버깅 절차를 레시피로 저장해 매번 같은 설명을 줄입니다."
  }
];

export default function AiPage() {
  const posts = getAiPosts();

  return (
    <main className="page">
      <section className="shell page-hero ai-hero">
        <span className="eyebrow">AI Deep Dive</span>
        <h1 className="section-title">개발 AI를 도구로 쓰되, 판단은 개발자가 한다.</h1>
        <p className="section-copy">
          Codex, Claude Code 같은 개발 도구를 중심으로 문제 정의, 코드 읽기, 구현, 검증, 회고를
          기록합니다. 나중에는 이미지, 문서, 자동화 도구까지 확장할 수 있는 AI 학습 아카이브입니다.
        </p>
        <div className="tag-row ai-track-row">
          {tracks.map((track) => (
            <span className="pill" key={track}>
              {track}
            </span>
          ))}
        </div>
      </section>

      <section className="shell ai-scoreboard">
        <div>
          <strong>01</strong>
          <span>질문을 요구사항으로 바꾸기</span>
        </div>
        <div>
          <strong>02</strong>
          <span>답변을 실행 가능한 코드로 검증하기</span>
        </div>
        <div>
          <strong>03</strong>
          <span>배운 내용을 글과 데모로 남기기</span>
        </div>
      </section>

      <section className="shell section-block ai-system-section">
        <span className="eyebrow">AI Productivity Map</span>
        <div className="section-head">
          <h2 className="section-title">AI는 답변기가 아니라 작업 흐름에 넣을 때 생산성이 올라갑니다.</h2>
          <Link href="/ai/ai-productivity-rag-mental-model">활용법 글 읽기</Link>
        </div>
        <div className="ai-system-map">
          {systemMap.map((item) => (
            <article className="ai-map-card" key={item.title}>
              <div>
                <item.icon size={24} />
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="ai-loop-strip" aria-label="AI productivity concepts">
          <div className="ai-loop-lead">
            <Sparkles size={24} />
            <strong>Context를 고르고, 도구를 연결하고, 반복 작업을 저장합니다.</strong>
          </div>
          {productivityLoops.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section-block">
        <span className="eyebrow">AI Notes</span>
        <div className="section-head">
          <h2 className="section-title">개발 AI 사용법을 기록하는 글.</h2>
        </div>
        <div className="ai-post-grid">
          {posts.map((post) => (
            <Link className="ai-post-card card" href={`/ai/${encodeURIComponent(post.slug)}`} key={post.slug}>
              <span>{post.tool}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="ai-post-meta">
                <small>{post.level}</small>
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell section-block">
        <span className="eyebrow">Working Style</span>
        <div className="section-head">
          <h2 className="section-title">AI를 개발 과정에 넣는 방식.</h2>
        </div>
        <div className="ai-practice-grid">
          {practices.map((item) => (
            <article className="ai-practice-card card" key={item.title}>
              <item.icon size={26} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section-block">
        <span className="eyebrow">Use Cases</span>
        <div className="ai-log-panel card">
          <div className="ai-log-heading">
            <Bot size={28} />
            <div>
              <h2>AI 사용 기록</h2>
              <p>AI를 잘 쓰는 역량은 빠르게 질문하는 능력이 아니라, 결과를 검증하는 습관입니다.</p>
            </div>
          </div>
          <div className="ai-log-list">
            {[
              "코드베이스 탐색",
              "테스트 케이스 설계",
              "리팩터링 후보 비교"
            ].map((item) => (
              <article key={item}>
                <h3>{item}</h3>
                <p>AI의 답을 그대로 적용하지 않고, 변경 범위와 실패 가능성을 먼저 나눕니다.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
