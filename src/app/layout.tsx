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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
