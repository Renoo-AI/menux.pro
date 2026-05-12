
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-mx-espresso text-mx-surface hover:bg-mx-espresso/80",
    success: "bg-mx-success/10 text-mx-success hover:bg-mx-success/20",
    warning: "bg-mx-warning/10 text-mx-warning hover:bg-mx-warning/20",
    danger: "bg-mx-danger/10 text-mx-danger hover:bg-mx-danger/20",
    info: "bg-mx-info/10 text-mx-info hover:bg-mx-info/20",
    outline: "text-mx-espresso border border-mx-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-mx-accent focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
