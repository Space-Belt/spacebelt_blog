import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Code2,
  Database,
  FileText,
  GitBranch,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  TerminalSquare
} from "lucide-react";
import { HomeRandomGame } from "@/components/games/HomeRandomGame";
import { HeroOrbit } from "@/components/hero-orbit";
import { MotionDiv, MotionSection } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SiteSearch } from "@/components/site-search";
import { getAiPosts, getBlogPosts, getProjects, getSearchItems } from "@/lib/content";

const strengths = [
  {
    icon: Braces,
    title: "JavaScript 기반 화면 구현",
    body: "React와 React Native에서 화면, 상태, API 응답이 하나의 사용자 흐름으로 이어지도록 구현합니다."
  },
  {
    icon: Smartphone,
    title: "웹과 앱의 사용 경험 연결",
    body: "웹 UI와 모바일 앱 인터랙션을 함께 다루며, 사용자가 느끼는 지연과 불편함을 줄이는 방향으로 생각합니다."
  },
  {
    icon: MessageSquareText,
    title: "원인을 설명하는 기록",
    body: "막힌 문제를 해결에서 끝내지 않고, 왜 발생했고 어떤 구조로 풀었는지 다시 설명할 수 있게 글로 남깁니다."
  }
];

const identityTags = ["React", "React Native", "JavaScript", "TypeScript", "Next.js"];

const experience = [
  {
    period: "Frontend",
    title: "화면과 데이터 흐름을 함께 설계",
    body: "사용자 액션이 상태 변경, API 요청, 렌더링 결과로 이어지는 과정을 분리해서 보고, 화면이 왜 그렇게 동작하는지 설명 가능한 구조로 구현하려고 합니다.",
    tags: ["React", "React Native", "TypeScript", "State"]
  },
  {
    period: "Product Work",
    title: "프로젝트에서 맡은 기능을 끝까지 연결",
    body: "OCR 영수증 분석, Analytics 이벤트, 입장 인증, 제스처 인터랙션처럼 특정 기능이 실제 사용 흐름에 들어가는 과정을 다뤘습니다.",
    tags: ["OCR", "Analytics", "Gesture", "Admin Web"]
  },
  {
    period: "Learning Archive",
    title: "JavaScript와 CS 기본기를 화면 문제로 연결",
    body: "실행 컨텍스트, 렌더링 비용, OS 스케줄링, HTTP 캐시처럼 프론트엔드 품질에 영향을 주는 기반 지식을 글로 정리합니다.",
    tags: ["JavaScript", "CS", "Network", "MDX"]
  }
];

const stackGroups = [
  {
    label: "Mobile",
    items: ["React Native", "Expo", "Reanimated", "FCM", "Native Modules"]
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "MDX", "Framer Motion"]
  },
  {
    label: "Tools",
    items: ["Firebase", "Mixpanel", "Codex", "Claude Code", "Git"]
  }
];

const workflowSteps = [
  {
    label: "Define",
    title: "작업 명세화",
    body: "목표, 관련 파일, 제약, 완료 기준을 먼저 정리해 AI가 추측할 여지를 줄입니다."
  },
  {
    label: "Ground",
    title: "근거 연결",
    body: "코드베이스, 공식 문서, 디자인 기준, 에러 로그를 context로 붙여 답변의 기준을 세웁니다."
  },
  {
    label: "Verify",
    title: "검증 후 반영",
    body: "diff, 타입, 빌드, 화면 흐름을 확인해 실제로 남길 코드와 버릴 초안을 나눕니다."
  }
];

const aiCapabilities = [
  {
    icon: Database,
    title: "RAG / Context",
    body: "기억에만 의존하지 않고 필요한 문서와 코드 근거를 붙여 답변 품질을 높입니다."
  },
  {
    icon: GitBranch,
    title: "Agentic Coding",
    body: "코드 탐색, 수정, 테스트 실행을 작은 단위로 맡기고 변경 범위를 직접 관리합니다."
  },
  {
    icon: ShieldCheck,
    title: "Review Loop",
    body: "AI 결과를 바로 믿지 않고 diff와 실행 결과로 검증해 제품 기준에 맞게 다듬습니다."
  }
];

export default function Home() {
  const projects = getProjects().slice(0, 3);
  const posts = getBlogPosts().slice(0, 4);
  const aiPosts = getAiPosts().slice(0, 2);
  const searchItems = getSearchItems();

  return (
    <main>
      <section className="home-hero">
        <HeroOrbit />
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow">Frontend Developer / JavaScript Ecosystem</span>
            <h1>Zero 불편함을 향해, 화면의 완성도를 설계하는 프론트엔드 개발자.</h1>
            <p>
              좋은 프론트엔드는 사용자가 망설이는 순간을 줄이고, 기다림마저 자연스러운 흐름으로
              바꾸는 일이라고 생각합니다. React와 React Native로 웹과 앱의 화면, 상태,
              인터랙션을 연결하며 제품의 사용감을 끝까지 다듬습니다.
            </p>
            <div className="identity-strip" aria-label="Developer focus">
              {identityTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <SiteSearch items={searchItems} variant="hero" />
            <div className="hero-actions">
              <Link className="button" href="/projects">
                프로젝트 보기 <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/blog">
                기술 글 읽기
              </Link>
              <a className="button secondary" href="https://github.com/Space-Belt" target="_blank" rel="noreferrer">
                GitHub <Code2 size={18} />
              </a>
            </div>
          </div>

          <HomeRandomGame />
        </div>
      </section>

      <MotionSection
        className="shell home-strength-grid"
        aria-label="Main strengths"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
      >
        {strengths.map((item, index) => (
          <MotionDiv
            className="home-strength-card card interactive-card"
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
          >
            <item.icon size={24} />
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </MotionDiv>
        ))}
      </MotionSection>

      <MotionSection
        className="shell section-block"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
      >
        <span className="eyebrow">Experience</span>
        <div className="section-head">
          <h2 className="section-title">화면, 기능, 기록을 같이 봅니다.</h2>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <MotionDiv
              className="experience-row"
              key={item.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <MotionSection
        className="shell section-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="eyebrow">Featured Projects</span>
        <div className="section-head">
          <h2 className="section-title">대표 프로젝트.</h2>
          <Link href="/projects">모든 프로젝트 보기</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </MotionSection>

      <MotionSection
        className="home-stack-band"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
      >
        <div className="shell">
          <span className="eyebrow">Tech Stack</span>
          <div className="section-head">
            <h2 className="section-title">현재 작업에 자주 쓰는 기술.</h2>
          </div>
          <div className="home-stack-grid">
            {stackGroups.map((group) => (
              <article className="home-stack-card" key={group.label}>
                <div>
                  {group.label === "Mobile" ? <Smartphone size={23} /> : null}
                  {group.label === "Frontend" ? <Braces size={23} /> : null}
                  {group.label === "Tools" ? <TerminalSquare size={23} /> : null}
                  <h3>{group.label}</h3>
                </div>
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
        </div>
      </MotionSection>

      <MotionSection
        className="shell section-block home-writing-layout"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <span className="eyebrow">Writing</span>
          <h2 className="section-title">공부한 것과 막혔던 문제를 다시 설명합니다.</h2>
          <p className="section-copy">
            글은 Markdown처럼 작성하는 MDX 파일로 관리합니다. 새 글을 추가하고 push하면 배포된
            사이트에도 자동으로 반영되는 흐름을 목표로 합니다.
          </p>
          <Link className="button secondary" href="/blog">
            블로그 전체 보기 <FileText size={18} />
          </Link>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <Link className="post-row" href={`/blog/${encodeURIComponent(post.slug)}`} key={post.slug}>
              <div>
                <span>{post.tags.slice(0, 2).join(" · ") || "Technical Note"}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </MotionSection>

      <MotionSection
        className="home-ai-section"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
      >
        <div className="shell home-ai-panel">
          <div className="ai-workflow-copy">
            <span className="eyebrow">AI Workflow</span>
            <h2>AI를 코드 생성기가 아니라 개발 프로세스의 보조 엔진으로 씁니다.</h2>
            <p>
              Codex와 Claude Code를 코드 읽기, 구현 후보 비교, 테스트 초안 작성, 글 구조화에
              사용합니다. RAG, MCP, Skills 같은 개념은 필요한 순간에만 붙이고, 최종 판단은
              검증 가능한 근거로 남깁니다.
            </p>
            <div className="ai-capability-grid" aria-label="AI capabilities">
              {aiCapabilities.map((item) => (
                <article key={item.title}>
                  <item.icon size={20} />
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <Link className="button secondary ai-workflow-link" href="/ai">
              AI 활용 기록 보기 <Bot size={18} />
            </Link>
          </div>
          <div className="ai-workflow-steps" aria-label="AI workflow steps">
            {workflowSteps.map((step, index) => (
              <MotionDiv
                className="ai-workflow-step"
                key={step.label}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{step.label}</small>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="ai-home-posts">
            {aiPosts.map((post) => (
              <Link href={`/ai/${encodeURIComponent(post.slug)}`} key={post.slug}>
                <span>{post.tool}</span>
                <strong>{post.title}</strong>
                <small>{post.level}</small>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="shell home-connect"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <Code2 size={28} />
        <h2>프로젝트와 기록을 계속 쌓는 중입니다.</h2>
        <p>
          이력서에는 배포 도메인과 GitHub를 함께 넣고, 이 사이트에서는 프로젝트 근거와 기술 글을
          연결하는 방향이 가장 좋습니다.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/projects">
            작업 확인하기 <ArrowRight size={18} />
          </Link>
          <Link className="button secondary" href="/blog">
            글 보러가기
          </Link>
        </div>
      </MotionSection>
    </main>
  );
}
