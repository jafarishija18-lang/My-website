import { useRef } from "react";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/*
 * Tilts toward the pointer in 3D, nudges `shift` px in the pointer's direction and
 * lights up a soft glare where the pointer is. Mouse only by default; pass `touch`
 * to also respond to fingers on phones (on tap and while dragging across it).
 */
export default function Tilt({ max = 10, shift = 0, touch = false, glare = true, className = "", children }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const resetTimer = useRef(0);

  const allowed = (e) => {
    if (reducedMotion()) return false;
    if (e.pointerType === "mouse") return window.matchMedia("(hover: hover)").matches;
    return touch;
  };

  const set = (vars) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
    });
  };

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !allowed(e)) return;
    clearTimeout(resetTimer.current);
    const r = el.getBoundingClientRect();
    const px = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const py = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    el.classList.add("is-active");
    set({
      "--rx": `${(0.5 - py) * max}deg`,
      "--ry": `${(px - 0.5) * max}deg`,
      "--tx": `${(px - 0.5) * 2 * shift}px`,
      "--ty": `${(py - 0.5) * 2 * shift}px`,
      "--mx": `${px * 100}%`,
      "--my": `${py * 100}%`,
    });
  };

  const reset = () => {
    ref.current?.classList.remove("is-active");
    set({ "--rx": "0deg", "--ry": "0deg", "--tx": "0px", "--ty": "0px" });
  };

  // After a tap the finger lifts immediately; hold the pose briefly so it's visible
  const onEnd = (e) => {
    clearTimeout(resetTimer.current);
    if (e.pointerType === "mouse") reset();
    else resetTimer.current = setTimeout(reset, 450);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onMove}
      onPointerMove={onMove}
      onPointerLeave={onEnd}
      onPointerUp={onEnd}
      onPointerCancel={onEnd}
      className={`tilt relative ${className}`}
    >
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  );
}
