import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * One dominant element per page: the h1 here is it. Section headers inside
 * the page body (SectionHeader) stay a full step down in scale and weight.
 */
export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="flex flex-col gap-1.5">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
          {title}
        </h1>
        {description ? <p className="max-w-2xl text-sm text-text-secondary">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
