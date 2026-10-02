import { Sparkles } from "lucide-react";
import { SKILLS } from "../data";

const ITEMS = [...new Set(Object.values(SKILLS).flat())];

// Endless ribbon of skills; pauses on hover.
export default function Marquee() {
  return (
    <div className="marquee overflow-hidden py-6" aria-hidden="true">
      <div className="marquee-track">
        {/* per-item padding (not gap) keeps the -50% loop seamless */}
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="shrink-0 pr-5">
            <span className="chip !text-sm !px-5 !py-2.5">
              <Sparkles size={14} className="text-violet" />
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
