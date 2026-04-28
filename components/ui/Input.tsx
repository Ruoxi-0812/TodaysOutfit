import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-input border border-blush-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";
