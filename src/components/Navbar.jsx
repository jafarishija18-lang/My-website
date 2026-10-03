import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAME } from "../data";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScroll } from "../hooks/useScroll";
import { useTheme } from "../hooks/useTheme";
import profilePhoto from "../assets/profile.png";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];
const IDS = LINKS.map((l) => l.id);

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === "dark";
  return (
    <button
      role="switch"
      aria-checked={dark}
      onClick={onToggle}
      aria-label="Dark theme"
      className="neu-switch shrink-0"
    >
      <span className="neu-switch-knob">
        <Sun
          size={16}
          className={`absolute text-amber transition-all duration-500 ${
            dark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          size={15}
          className={`absolute text-violet transition-all duration-500 ${
            dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </span>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const { y } = useScroll();
  const active = useActiveSection(IDS);
  const scrolled = y > 24;

  // Sliding clay pill behind the active link
  const linkRefs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    const update = () => {
      const el = linkRefs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
      else setPill((p) => ({ ...p, visible: false }));
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl flex items-center justify-between rounded-[26px] transition-all duration-500 ${
          scrolled || open ? "px-4 py-2.5 backdrop-blur-xl" : "px-2 py-4"
        }`}
        style={{
          transitionTimingFunction: "var(--ease-out)",
          background: scrolled || open ? "var(--nav-bg)" : "transparent",
          boxShadow: scrolled || open ? "var(--neu-out)" : "none",
        }}
      >
        <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
          {/* Photo avatar in a clay frame, zoomed in on the face */}
          <span className="clay-sm !rounded-[15px] p-[3px] w-11 h-11 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <span className="block w-full h-full overflow-hidden rounded-[12px]">
              <img
                src={profilePhoto}
                alt=""
                className="w-full h-full object-cover scale-[1.9]"
                style={{ transformOrigin: "50% 28%" }}
              />
            </span>
          </span>
          <span className="hidden sm:block font-heading font-extrabold text-ink tracking-tight">
            {NAME}
          </span>
        </a>

        <ul className="hidden lg:flex relative items-center gap-1 text-sm font-semibold">
          <span
            aria-hidden="true"
            className="absolute top-0 h-full neu-in rounded-full transition-all duration-500"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: pill.visible ? 1 : 0,
              transitionTimingFunction: "var(--ease-spring)",
            }}
          />
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                ref={(el) => (linkRefs.current[l.id] = el)}
                href={`#${l.id}`}
                className={`relative block px-4 py-2 rounded-full transition-colors duration-300 ${
                  active === l.id ? "text-violet" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a href="#contact" className="btn btn-primary hidden lg:inline-flex !py-2.5 !px-5 !text-sm">
            Let's talk
          </a>
          <button
            className="lg:hidden btn btn-soft !p-0 w-11 h-11 !rounded-full"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </span>
          </button>
        </div>
      </nav>

      <div className="menu-collapse lg:hidden mx-auto max-w-6xl mt-3" data-open={open}>
        <div>
          {/* padding lives inside the clipped box so the clay shadow isn't cut off */}
          <div className="px-1 pb-6">
            <ul
              className="flex flex-col gap-1 p-3 rounded-[26px] backdrop-blur-xl"
              style={{ background: "var(--nav-bg)", boxShadow: "var(--neu-out)" }}
            >
              {LINKS.map((l, i) => (
                <li key={l.id} style={{ "--i": i }}>
                  <a
                    href={`#${l.id}`}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-2xl font-semibold transition-colors ${
                      active === l.id ? "text-violet neu-in" : "text-muted hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li style={{ "--i": LINKS.length }} className="pt-2">
                <a
                  href="#contact"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Let's talk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
