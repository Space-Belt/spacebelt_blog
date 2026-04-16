import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card card" href={`/projects/${encodeURIComponent(project.slug)}`}>
      <div className="project-image">
        <Image src={project.cover} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <span>{project.type}</span>
          <ArrowUpRight size={18} />
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.stack.slice(0, 4).map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
