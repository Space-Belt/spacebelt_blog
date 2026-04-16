import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="page">
      <section className="shell page-hero">
        <span className="eyebrow">Projects</span>
        <h1 className="section-title">참여했거나 직접 만든 앱 프로젝트.</h1>
        <p className="section-copy">
          React Native CLI와 Expo 프로젝트에서 맡았던 기능을 정리했습니다. 인증, 게시판, OCR,
          Analytics, 제스처, 네이티브 모듈처럼 실제로 작업했던 부분 위주로 남겼습니다.
        </p>
      </section>
      <section className="shell project-grid page-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}
