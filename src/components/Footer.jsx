import { Heart, Coffee } from "lucide-react";
import { NAME } from "../data";

export default function Footer() {
  return (
    <footer className="px-4 pb-6">
      <div className="clay-sm !rounded-[26px] max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted">
        <p>
          © 2025 – {new Date().getFullYear()} <span className="font-semibold text-ink">{NAME}</span>. Built with React.
        </p>
        <p className="inline-flex items-center gap-1.5">
          Crafted with <Heart size={15} className="text-pink fill-current animate-pulse" /> and lots of
          <Coffee size={15} className="text-amber" />
        </p>
      </div>
    </footer>
  );
}
