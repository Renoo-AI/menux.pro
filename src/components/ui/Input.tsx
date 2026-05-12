import React from 'react';

import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-mx-espresso">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-mx-border bg-mx-surface px-3 py-2 text-sm text-mx-espresso shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-mx-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mx-accent disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-mx-danger focus-visible:ring-mx-danger",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-mx-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
