"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * Hide and show use different cutoffs so collapsing a sticky header
 * (the announcement bar is up to 64px) does not drop scrollY back under
 * the threshold and flash the bar in and out.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hideAbove = threshold;
    const showBelow = Math.max(0, threshold - 72);

    const update = () => {
      const y = window.scrollY;
      setScrolled((was) => {
        if (y > hideAbove) return true;
        if (y <= showBelow) return false;
        return was;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
