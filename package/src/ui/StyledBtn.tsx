import { forwardRef } from "react";
import "./StyledBtn.css";

export const StyledBtn = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`styled-btn${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
});

StyledBtn.displayName = "StyledBtn";
