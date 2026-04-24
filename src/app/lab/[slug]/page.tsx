import { notFound } from "next/navigation";

type LabDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata(_: LabDetailPageProps) {
  return {};
}

export default async function LabDetailPage(_: LabDetailPageProps) {
  notFound();
}
