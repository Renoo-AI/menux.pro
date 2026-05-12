import React from 'react';

import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-mx-espresso">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border border-mx-border bg-mx-surface px-3 py-2 pr-10 text-sm text-mx-espresso shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mx-accent disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-mx-danger focus-visible:ring-mx-danger",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-mx-muted" />
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-mx-danger">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
