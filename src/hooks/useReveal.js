import { useEffect } from "react";

/*
 * Toggles `.is-visible` on every [data-reveal] element as it enters/leaves the viewport,
 * so content animates in on the way down AND on the way back up.
 *
 * When an element leaves, `data-dir` records which edge it left through ("up" = it
 * scrolled off the top). The CSS uses that to make it re-enter from the same side.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio, boundingClientRect, rootBounds }) => {
          if (isIntersecting && intersectionRatio >= 0.15) {
            target.classList.add("is-visible");
          } else if (!isIntersecting) {
            // Hide only once fully out of view — the gap between 0 and 0.15 avoids flicker
            target.classList.remove("is-visible");
            const leftViaTop = boundingClientRect.top < (rootBounds?.top ?? 0);
            target.dataset.dir = leftViaTop ? "up" : "down";
          }
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
