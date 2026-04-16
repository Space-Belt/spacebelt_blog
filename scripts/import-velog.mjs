import fs from "node:fs/promises";
import path from "node:path";

const ENDPOINT = "https://v2.velog.io/graphql";
const USERNAME = "spacebelt";
const OUTPUT_DIR = path.join(process.cwd(), "content", "blog");
const EXCLUDED_URL_SLUGS = new Set([
  "절차-지향-객체-지향",
  "알고리즘-10-16",
  "알고리즘-241014",
  "HTML-공부",
  "CSS-애니메이션keyframes-Canvas-API",
  "CallBack-함수-기초",
  "React-정리"
]);

const POSTS_QUERY = `
  query Posts($username: String, $limit: Int) {
    posts(username: $username, limit: $limit) {
      id
      title
      short_description
      url_slug
      released_at
      updated_at
      tags
    }
  }
`;

const POST_QUERY = `
  query ReadPost($username: String, $url_slug: String) {
    post(username: $username, url_slug: $url_slug) {
      id
      title
      body
      short_description
      released_at
      updated_at
      tags
      is_markdown
      thumbnail
    }
  }
`;

async function graphql(query, variables) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(`Velog request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("\n"));
  }

  return payload.data;
}

function toDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function compactDescription(value, fallback) {
  return (value || fallback || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function fileSlug(urlSlug) {
  return `velog-${urlSlug}`
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeMdxOutsideCode(markdown) {
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((part) => {
      if (part.startsWith("```")) return part;

      return part
        .replace(/<img\s+([^>]*?)>/gi, (_, attrs) => {
          const src = attrs.match(/src=["']([^"']+)["']/i)?.[1];
          const alt = attrs.match(/alt=["']([^"']*)["']/i)?.[1] || "image";
          return src ? `![${alt}](${src})` : "";
        })
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<([^>\n]+)>/g, (_, inner) => `&lt;${inner}&gt;`)
        .replace(/\{/g, "&#123;")
        .replace(/\}/g, "&#125;");
    })
    .join("");
}

function renderFrontmatter(post) {
  const title = post.title || "Untitled";
  const description = compactDescription(post.short_description, title);
  const tags = post.tags?.length ? post.tags : ["기록"];

  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `date: ${JSON.stringify(toDate(post.released_at))}`,
    `tags: ${JSON.stringify(tags)}`,
    "---"
  ].join("\n");
}

async function main() {
  const data = await graphql(POSTS_QUERY, { username: USERNAME, limit: 100 });
  const posts = data.posts ?? [];

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const listItem of posts) {
    if (EXCLUDED_URL_SLUGS.has(listItem.url_slug)) {
      console.log(`Skipped ${listItem.url_slug}`);
      continue;
    }

    const data = await graphql(POST_QUERY, {
      username: USERNAME,
      url_slug: listItem.url_slug
    });
    const post = data.post;
    if (!post?.body) continue;

    const filename = `${fileSlug(listItem.url_slug)}.mdx`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const body = sanitizeMdxOutsideCode(post.body);
    const mdx = `${renderFrontmatter(post)}

${body}
`;

    await fs.writeFile(filepath, mdx, "utf8");
    console.log(`Imported ${filename}`);
  }

  console.log(`Imported ${posts.length} Velog posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
