import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Cpu,
  Layers3,
  ScanLine,
  Smartphone,
  Sparkles
} from "lucide-react";
import { HeroOrbit } from "@/components/hero-orbit";
import { MotionSection } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SiteSearch } from "@/components/site-search";
import { getAiPosts, getBlogPosts, getProjects, getSearchItems } from "@/lib/content";

const stack = ["React Native", "React", "Next.js", "TypeScript", "Reanimated", "Firebase"];

const focusCards = [
  {
    icon: Smartphone,
    title: "React Native 작업",
    body: "Expo와 CLI 환경에서 인증, 게시판, 제스처, 푸시 알림, 네이티브 모듈을 다뤘습니다."
  },
  {
    icon: ScanLine,
    title: "기능 구현 기록",
    body: "OCR, FCM, 입장 인증, Analytics처럼 프로젝트에서 맡았던 기능을 정리했습니다."
  },
  {
    icon: Bot,
    title: "AI 도구 활용",
    body: "Codex와 Claude Code를 코드 읽기와 구현 보조에 사용하고, 결과는 직접 확인합니다."
  }
];

const timeline = [
  "필요한 화면 흐름을 먼저 정리한다",
  "기능을 작은 단위로 구현한다",
  "막힌 부분은 기록으로 남긴다",
  "데이터와 로그로 다시 확인한다"
];

const proofCards = [
  {
    icon: Code2,
    label: "FETE",
    title: "이벤트 플랫폼 앱과 관리자 웹",
    body: "이벤트 검색, 등록, 판매, 입장 인증 관련 화면과 기능을 작업했습니다."
  },
  {
    icon: ChartNoAxesCombined,
    label: "똑구",
    title: "구독 관리 서비스",
    body: "OCR 영수증 분석과 Mixpanel/Firebase Analytics 이벤트 추적을 붙였습니다."
  },
  {
    icon: Smartphone,
    label: "EVAN",
    title: "소개팅 앱 인터랙션",
    body: "Swipe, Drag & Drop, Carousel 기능을 Reanimated와 Gesture Handler로 구현했습니다."
  }
];

export default function Home() {
  const projects = getProjects().slice(0, 4);
  const posts = getBlogPosts().slice(0, 3);
  const aiPosts = getAiPosts().slice(0, 2);
  const searchItems = getSearchItems();

  return (
    <main>
      <section className="hero">
        <HeroOrbit />
        <div className="shell hero-stage">
          <div className="hero-content">
            <span className="eyebrow">React Native / React Frontend</span>
            <h1>React Native와 React로 서비스 기능을 구현해왔습니다.</h1>
            <p>
              앱과 웹 화면을 만들면서 인증, 게시판, OCR, FCM, 제스처, Analytics 같은 기능을
              경험했습니다. 공부한 내용과 막혔던 문제는 나중에 다시 볼 수 있게 글로 정리합니다.
            </p>
            <SiteSearch items={searchItems} variant="hero" />
            <div className="hero-actions">
              <Link className="button" href="/projects">
                프로젝트 보기 <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/blog">
                글 읽기
              </Link>
            </div>
          </div>

          <div className="hero-signal">
            <div className="signal-head">
              <Sparkles size={18} />
              <span>Current Focus</span>
            </div>
            <div className="signal-metric">
              <strong>React Native Engineer</strong>
              <p>앱 화면을 만들고, 필요한 네이티브 설정과 사용자 행동 로그를 함께 확인합니다.</p>
            </div>
            <div className="signal-rows">
              <span>Project</span>
              <Link href="/projects/fete-event-platform">FETE 이벤트 플랫폼</Link>
              <span>Mobile Interaction</span>
              <Link href="/projects/evan-dating-app">EVAN 제스처 구현</Link>
              <span>Native Bridge</span>
              <Link
                href={`/blog/${encodeURIComponent(
                  "velog-React-Native-New-Architecture-3편-TurboModules-Codegen"
                )}`}
              >
                TurboModule 기록
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell stack-strip" aria-label="Core stack">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="shell focus-grid" aria-label="Portfolio focus">
        {focusCards.map((item) => (
          <article className="focus-card card" key={item.title}>
            <item.icon size={25} />
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="shell proof-grid" aria-label="Resume highlights">
        {proofCards.map((item) => (
          <article className="proof-card" key={item.title}>
            <div>
              <item.icon size={24} />
              <span>{item.label}</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <MotionSection
        className="shell section-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">Selected Work</span>
        <div className="section-head">
          <h2 className="section-title">작업했던 앱 프로젝트.</h2>
          <Link href="/projects">전체 보기</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </MotionSection>

      <section className="shell learning-band">
        <div>
          <span className="eyebrow">Learning Loop</span>
          <h2>작업하면서 정리하는 방식.</h2>
        </div>
        <ol>
          {timeline.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="feature-band">
        <div className="shell feature-grid">
          {[
            {
              icon: Smartphone,
              title: "Mobile flow",
              body: "로그인, 게시판, 댓글, 인증처럼 앱에서 자주 필요한 흐름을 구현했습니다."
            },
            {
              icon: Cpu,
              title: "Native touch",
              body: "IDFA, GAID, FCM, New Architecture처럼 네이티브 설정이 필요한 작업도 경험했습니다."
            },
            {
              icon: Code2,
              title: "Usage data",
              body: "Mixpanel과 Firebase Analytics로 사용자 행동 이벤트를 남기는 작업을 했습니다."
            }
          ].map((item) => (
            <div className="feature-card" key={item.title}>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-block ai-home-section">
        <span className="eyebrow">AI Workflow</span>
        <div className="section-head">
          <h2 className="section-title">개발 AI를 써보며 정리한 기록.</h2>
          <Link href="/ai">AI 글 보기</Link>
        </div>
        <div className="ai-home-grid">
          <div className="ai-home-copy">
            <Layers3 size={28} />
            <h3>AI는 코드 읽기와 구현 보조에 사용합니다.</h3>
            <p>
              Codex와 Claude Code로 코드베이스를 읽고 구현 방향을 잡아봅니다. 다만 결과는 diff,
              빌드, 문서, 실제 화면으로 다시 확인하려고 합니다.
            </p>
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
      </section>

      <section className="shell section-block">
        <span className="eyebrow">Writing</span>
        <div className="section-head">
          <h2 className="section-title">공부한 것과 막혔던 문제를 남긴 글.</h2>
          <Link href="/blog">블로그 보기</Link>
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
      </section>
    </main>
  );
}
