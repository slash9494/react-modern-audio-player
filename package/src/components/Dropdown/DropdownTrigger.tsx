import { FC, KeyboardEvent, PropsWithChildren } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { dropdownContext } from "./DropdownContext";

export const DropdownTrigger: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, setIsOpen, dropdownId } =
    useNonNullableContext(dropdownContext);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="dropdown-trigger-wrapper"
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={dropdownId}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
