import type { CSSProperties } from "react";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getProjects();
  const heroProjects = projects.slice(0, 4);

  return (
    <main className="page">
      <section className="shell page-hero projects-hero">
        <div className="projects-hero-copy">
          <span className="eyebrow">Projects</span>
          <h1 className="section-title">제품 안에서 완성한 앱 기능들.</h1>
          <p className="section-copy">
            구독 관리, 이벤트 플랫폼, 일상 공유 앱, 인터랙션 중심 앱에서 화면과 데이터,
            네이티브 연동, 사용자 행동 추적이 실제 서비스 흐름으로 이어지도록 구현했습니다.
          </p>
        </div>
        <div className="projects-hero-visual" aria-hidden="true">
          <div className="projects-showcase">
            {heroProjects.map((project, index) => (
              <div
                className="projects-showcase-card"
                key={project.slug}
                style={
                  {
                    "--card-index": index,
                    backgroundImage: `linear-gradient(180deg, rgba(8, 10, 13, 0.05), rgba(8, 10, 13, 0.86)), url(${project.cover})`
                  } as CSSProperties
                }
              >
                <span>{project.type}</span>
                <strong>{project.title}</strong>
                <small>{project.impact[0]}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell project-grid page-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}
