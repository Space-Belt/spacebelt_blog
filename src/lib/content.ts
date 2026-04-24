import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PROJECT_DIR = path.join(process.cwd(), "content", "projects");
const AI_DIR = path.join(process.cwd(), "content", "ai");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  type: string;
  date: string;
  cover: string;
  stack: string[];
  role: string;
  impact: string[];
  content: string;
};

export type AiPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tool: string;
  tags: string[];
  level: string;
  readingMinutes: string;
  content: string;
};

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "Blog" | "AI" | "Project" | "Lab";
  tags: string[];
};

function readMdxFile<T>(directory: string, slug: string) {
  const filePath = path.join(directory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return { data: data as T, content };
}

function getSlugs(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug).normalize("NFC");
  } catch {
    return slug.normalize("NFC");
  }
}

function routePart(slug: string) {
  return encodeURIComponent(normalizeSlug(slug));
}

export function getBlogPosts() {
  return getSlugs(BLOG_DIR)
    .map((slug) => {
      const { data, content } = readMdxFile<Omit<BlogPost, "slug" | "readingMinutes" | "content">>(
        BLOG_DIR,
        slug
      );
      return {
        ...data,
        slug: normalizeSlug(slug),
        content,
        readingMinutes: readingTime(content).text
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getBlogPost(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  return getBlogPosts().find((post) => normalizeSlug(post.slug) === normalizedSlug);
}

export function getProjects() {
  return getSlugs(PROJECT_DIR)
    .map((slug) => {
      const { data, content } = readMdxFile<Omit<Project, "slug" | "content">>(
        PROJECT_DIR,
        slug
      );
      return {
        ...data,
        slug: normalizeSlug(slug),
        content
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getProject(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  return getProjects().find((project) => normalizeSlug(project.slug) === normalizedSlug);
}

export function getAiPosts() {
  return getSlugs(AI_DIR)
    .map((slug) => {
      const { data, content } = readMdxFile<
        Omit<AiPost, "slug" | "readingMinutes" | "content">
      >(AI_DIR, slug);
      return {
        ...data,
        slug: normalizeSlug(slug),
        content,
        readingMinutes: readingTime(content).text
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getAiPost(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  return getAiPosts().find((post) => normalizeSlug(post.slug) === normalizedSlug);
}

export function getSearchItems(): SearchItem[] {
  const blogItems = getBlogPosts().map((post) => ({
    title: post.title,
    description: post.description,
    href: `/blog/${routePart(post.slug)}`,
    type: "Blog" as const,
    tags: post.tags
  }));

  const aiItems = getAiPosts().map((post) => ({
    title: post.title,
    description: post.description,
    href: `/ai/${routePart(post.slug)}`,
    type: "AI" as const,
    tags: [post.tool, post.level, ...post.tags]
  }));

  const projectItems = getProjects().map((project) => ({
    title: project.title,
    description: project.summary,
    href: `/projects/${routePart(project.slug)}`,
    type: "Project" as const,
    tags: [project.type, ...project.stack]
  }));

  return [...aiItems, ...blogItems, ...projectItems];
}
