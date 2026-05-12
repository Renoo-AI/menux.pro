import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="mb-4 rounded-full bg-mx-soft p-4">
        <Icon className="h-8 w-8 text-mx-muted" />
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-mx-espresso">{title}</h3>
      <p className="mb-6 max-w-sm text-mx-muted">{description}</p>
      {action}
    </div>
  );
}
