import type { InputHTMLAttributes, Ref } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  placeholder: string;
  reference?: Ref<HTMLInputElement>;
  label?: string;
}

export function Input({ placeholder, reference, label, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="input-field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input ref={reference} id={inputId} placeholder={placeholder} className="text-input" {...props} />
    </div>
  );
}
