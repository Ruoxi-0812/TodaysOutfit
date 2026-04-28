import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      rows={3}
      className={`w-full rounded-input border border-blush-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent disabled:bg-gray-50 resize-none transition-colors ${className}`}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
