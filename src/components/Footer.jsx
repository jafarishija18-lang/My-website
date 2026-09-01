import { NAME } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <p>© 2025 – {new Date().getFullYear()} {NAME}. Built with React.</p>
        <p>
          Crafted with <span className="text-red-400">❤</span> and lots of{" "}
          <span className="text-amber-500">☕</span>
        </p>
      </div>
    </footer>
  );
}
