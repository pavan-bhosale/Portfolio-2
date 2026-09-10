"use client";

import { useEffect, useRef } from "react";

interface LenisInstance {
  stop: () => void;
  start: () => void;
  isStopped?: boolean;
}

export function useScrollLock(isLocked: boolean) {
  // Store scroll position so locking doesn't jump or shift
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getLenis = (): LenisInstance | undefined => {
      return (window as unknown as { lenis?: LenisInstance }).lenis;
    };

    if (isLocked) {
      // 1. Capture current scroll position
      scrollPosRef.current = window.scrollY || window.pageYOffset || 0;

      // 2. Pause Lenis smooth scrolling engine completely
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
      }

      // 3. Lock body and html
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      // 4. Cleanup when modal unmounts or closes
      return () => {
        const activeLenis = getLenis();
        if (activeLenis) {
          activeLenis.start();
        }
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.touchAction = prevBodyTouchAction;
      };
    }
  }, [isLocked]);
}
