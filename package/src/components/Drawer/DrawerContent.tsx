import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { CssTransition } from "@/ui/CssTransition";
import { drawerContext } from "./DrawerContext";

export type DrawerContentPlacement = "top" | "bottom" | "left" | "right";

export type DrawerContentProps = {
  isWithAnimation?: boolean;
  "aria-label"?: string;
};

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="button"]:not([aria-disabled="true"])';

export const DrawerContent: FC<PropsWithChildren<DrawerContentProps>> = ({
  children,
  isWithAnimation = true,
  "aria-label": ariaLabel = "Dialog",
}) => {
  const { isOpen, setIsOpen, onOpenChange, drawerId } =
    useNonNullableContext(drawerContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  const getFocusable = useCallback(
    () =>
      containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    []
  );

  const focusFirst = useCallback(() => {
    getFocusable()?.[0]?.focus();
  }, [getFocusable]);

  const onEntered = useCallback(() => {
    previousFocusRef.current = document.activeElement;
    focusFirst();
  }, [focusFirst]);

  const onExited = useCallback(() => {
    (previousFocusRef.current as HTMLElement | null)?.focus();
  }, []);

  useEffect(() => {
    if (isOpen && !isWithAnimation) {
      previousFocusRef.current = document.activeElement;
      focusFirst();
    } else if (!isOpen && !isWithAnimation) {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [isOpen, isWithAnimation, focusFirst]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onOpenChange && onOpenChange(false);
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
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
    },
    [setIsOpen, onOpenChange, getFocusable]
  );

  const Content = (
    <div
      ref={containerRef}
      className="drawer-content-container"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      id={drawerId}
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
      onEntered={onEntered}
      onExited={onExited}
    >
      {Content}
    </CssTransition>
  ) : isOpen ? (
    Content
  ) : null;
};
