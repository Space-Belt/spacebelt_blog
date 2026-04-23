import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Spacebelt Blog | Frontend Portfolio",
  description: "React, React Native, animation, and interface engineering portfolio.",
  openGraph: {
    title: "Spacebelt Blog",
    description: "Frontend portfolio and technical writing archive.",
    type: "website"
  }
};

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = saved && saved !== "system" ? saved : prefersLight ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
