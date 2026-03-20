import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, KeyboardEvent, PropsWithChildren, useEffect, useRef } from "react";
import { CssTransition } from "../CssTransition";
import { drawerContext } from "./DrawerContext";

export type DrawerContentPlacement = "top" | "bottom" | "left" | "right";

export type DrawerContentProps = {
  isWithAnimation?: boolean;
};

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const DrawerContent: FC<PropsWithChildren<DrawerContentProps>> = ({
  children,
  isWithAnimation = true,
}) => {
  const { isOpen, setIsOpen, onOpenChange } =
    useNonNullableContext(drawerContext);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      focusable?.[0]?.focus();
    } else {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      onOpenChange && onOpenChange(false);
      return;
    }
    if (e.key === "Tab") {
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const Content = (
    <div
      ref={containerRef}
      className="drawer-content-container"
      role="dialog"
      aria-modal="true"
      aria-label="Playlist"
      id="playlist-drawer"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );

  return isWithAnimation ? (
    <CssTransition
      visible={isOpen}
      name={"drawer-content-wrapper"}
      enterTime={20}
      leaveTime={60}
      clearTime={300}
      onExited={onExited}
      onEntered={onEntered}
    >
      {Content}
    </CssTransition>
  ) : (
    Content
  );
};
