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
    title: "제품 흐름을 고려한 화면 구현",
    body: "기획 의도를 화면, 상태, API 응답, 사용자 행동으로 연결해 실제 서비스 흐름 안에서 동작하게 만듭니다."
  },
  {
    icon: Smartphone,
    title: "React Native와 웹을 함께 다루는 개발",
    body: "Expo와 React Native CLI 앱, 관리자 웹, 서비스형 웹까지 넘나들며 필요한 기능을 끝까지 연결합니다."
  },
  {
    icon: MessageSquareText,
    title: "AI를 활용한 속도와 검증",
    body: "Codex, Claude Code, RAG, MCP를 작업 흐름에 넣고 결과는 diff, 빌드, 화면으로 다시 확인합니다."
  }
];

const identityTags = ["React Native", "React", "TypeScript", "AI-assisted Dev", "Product"];

const experience = [
  {
    period: "Frontend",
    title: "제품 맥락 안에서 화면을 구현",
    body: "자사 서비스와 커머스, 구독 관리, 이벤트 플랫폼을 다루며 화면 구현을 상태, 데이터, 운영 흐름과 함께 봅니다.",
    tags: ["React", "React Native", "TypeScript", "Product"]
  },
  {
    period: "Product Work",
    title: "기능을 배포와 운영까지 연결",
    body: "OCR 영수증 분석, 행동 데이터 추적, 관리자 웹, 입장 인증, 네이티브 모듈처럼 서비스 운영에 필요한 기능을 구현했습니다.",
    tags: ["OCR", "Analytics", "Admin Web", "Native Module"]
  },
  {
    period: "AI Workflow",
    title: "AI 도구를 개발 과정에 통합",
    body: "문제 분석, 구현 후보 비교, 코드 작성, 리뷰, 학습 리소스 정리에 AI를 활용하고 직접 검증하는 흐름을 만듭니다.",
    tags: ["Codex", "Claude Code", "RAG", "Review"]
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
            <h1>제품 흐름을 이해하고 구현하는 프론트엔드 개발자.</h1>
            <p>
              React Native와 React 기반으로 모바일 앱, 관리자 웹, 서비스 화면을 개발합니다. 제품
              기획부터 개발, 배포, 운영까지 이어지는 흐름을 경험했고, AI 도구를 개발 과정에
              적극적으로 활용해 문제 해결 속도와 결과의 정확도를 높이고 있습니다.
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
