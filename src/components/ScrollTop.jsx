import { ArrowUp } from "lucide-react";
import { useScroll } from "../hooks/useScroll";

const R = 22;
const C = 2 * Math.PI * R;

// Floating back-to-top button whose ring fills as you scroll down the page.
export default function ScrollTop() {
  const { y, progress } = useScroll();
  const visible = y > 500;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full clay-sm text-violet transition-all duration-500 hover:-translate-y-1 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "var(--ease-spring)", borderRadius: "999px" }}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <ArrowUp size={20} />
    </a>
  );
}
