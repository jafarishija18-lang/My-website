import { useEffect, useState } from "react";

// Scroll offset and page progress (0–1), throttled to animation frames.
export function useScroll() {
  const [state, setState] = useState({ y: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ y: window.scrollY, progress: max > 0 ? window.scrollY / max : 0 });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
