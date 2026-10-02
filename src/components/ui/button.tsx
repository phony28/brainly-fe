import type { ReactElement } from "react";
export interface ButtonProps {
variant: "primary" | "secondary";
size: "sm" | "md" | "lg";
onClick: () => void;
text: string;
startIcon ?: ReactElement;
endIcon ?: ReactElement;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600",
}

const defaultStyles = "rounded-md px-4 py-2 flex items-center gap-2 cursor-pointer";

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${defaultStyles} ${variantStyles[props.variant]}`}>{props.text}</button>
}