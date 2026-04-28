import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full rounded-input border border-blush-200 bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    />
  )
);

Select.displayName = "Select";
