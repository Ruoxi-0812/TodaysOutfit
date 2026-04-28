import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-card shadow-sm border border-blush-100 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={`p-5 pb-0 ${className}`} {...props} />;
}

export function CardBody({ className = "", ...props }: CardProps) {
  return <div className={`p-5 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`p-5 pt-0 flex items-center gap-2 ${className}`}
      {...props}
    />
  );
}
