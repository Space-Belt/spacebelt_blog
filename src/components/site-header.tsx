import Link from "next/link";
import { SiteSearch } from "@/components/site-search";
import { getSearchItems } from "@/lib/content";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/ai", label: "AI" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" }
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
      <SiteSearch items={searchItems} />
    </header>
  );
}
