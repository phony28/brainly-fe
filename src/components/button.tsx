import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({ variant, text, startIcon, onClick, type = "button", fullWidth, loading }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`app-button ${variant === "primary" ? "app-button-primary" : "app-button-secondary"}${fullWidth ? " app-button-full" : ""}`}
      disabled={loading}
      aria-busy={loading}
    >
      {startIcon && <span className="button-icon">{startIcon}</span>}
      {text}
    </button>
  );
}
