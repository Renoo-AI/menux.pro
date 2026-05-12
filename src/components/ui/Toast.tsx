
import { cn } from "../../lib/utils";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  onClose: (id: string) => void;
}

const icons = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const variants = {
  default: "bg-mx-surface text-mx-espresso border-mx-border",
  success: "bg-mx-success text-white border-mx-success",
  error: "bg-mx-danger text-white border-mx-danger",
  warning: "bg-mx-warning text-white border-mx-warning",
  info: "bg-mx-info text-white border-mx-info",
};

export function Toast({ id, message, variant = "default", onClose }: ToastProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-center justify-between space-x-4 rounded-lg border p-4 shadow-lg transition-all",
        variants[variant]
      )}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 opacity-90" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
