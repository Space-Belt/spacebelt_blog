import type { ComponentProps } from "react";

export const mdxComponents = {
  a: (props: ComponentProps<"a">) => <a {...props} target="_blank" rel="noreferrer" />,
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="callout">{children}</div>
  ),
  Metric: ({ label, value }: { label: string; value: string }) => (
    <div className="metric-box">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
};
