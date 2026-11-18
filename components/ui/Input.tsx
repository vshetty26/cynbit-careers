import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-black uppercase tracking-wider text-black mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border-4 border-black bg-white text-black font-bold focus:outline-none focus:border-red-600 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
            error ? "border-red-600 bg-red-50" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-2 text-sm font-bold text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
