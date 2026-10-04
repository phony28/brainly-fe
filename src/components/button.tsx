import type { ReactElement } from "react";

// Defining the properties that the Button component can accept
interface ButtonProps {
    variant: "primary" | "secondary"; 
    text: string; 
    startIcon?: ReactElement; 
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean; 
    loading?: boolean; 
}

// Mapping button variants to their respective CSS classes
const variantClasses = {
    "primary": "bg-purple-600 text-white", // Styles for primary variant
    "secondary": "bg-purple-200 text-purple-600", // Styles for secondary variant
};

// Default CSS classes for all buttons
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";      //items-center is for vertically allignment of the item to be center

// The Button functional component
export function Button({ variant, text, startIcon, onClick, type = "button", fullWidth, loading }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${variantClasses[variant]} ${defaultStyles}${fullWidth ? " w-full justify-center" : ""}${loading ? " opacity-45" : ""}`}
            disabled={loading}
            aria-busy={loading}
        >
            {startIcon && <span className="pr-2">{startIcon}</span>}
            {text}
        </button>
    );
}