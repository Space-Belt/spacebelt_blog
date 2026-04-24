import Link from "next/link";
import { Code2 } from "lucide-react";
import { SiteSearch } from "@/components/site-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSearchItems } from "@/lib/content";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/ai", label: "AI" },
  { href: "/games", label: "Games" }
];

export function SiteHeader() {
  const searchItems = getSearchItems();

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark" />
        spacebelt
      </Link>
      <nav aria-label="Main navigation">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <a
          className="github-link"
          href="https://github.com/Space-Belt"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          title="GitHub"
        >
          <Code2 size={17} />
        </a>
        <ThemeToggle />
        <SiteSearch items={searchItems} />
      </div>
    </header>
  );
}
