import { forwardRef } from "react";
import "./StyledBtn.css";

export const StyledBtn = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`styled-btn${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
});

StyledBtn.displayName = "StyledBtn";
