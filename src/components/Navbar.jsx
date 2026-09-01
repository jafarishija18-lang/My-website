import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAME } from "../data";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-heading font-bold text-lg tracking-tight gradient-text">
          {NAME.split(".").filter(Boolean).map((p) => p[0]).join("")}
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-cyan-400 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-colors"
        >
          Get in touch
        </a>

        <button
          className="md:hidden text-gray-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-bg/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-gray-300">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
