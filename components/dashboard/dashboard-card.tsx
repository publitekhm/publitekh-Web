import type { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, meta, children, className = "" }: DashboardCardProps) {
  return (
    <section className={`dashboard-card ${className}`}>
      {(title || meta) && (
        <div className="dashboard-card-head">
          {title && <h2>{title}</h2>}
          {meta && <span>{meta}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

