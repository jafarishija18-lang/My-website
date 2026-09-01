import { ArrowRight, ExternalLink } from "lucide-react";
import { NAME, ROLES, HERO_TAGS } from "../data";
import { useTypewriter } from "../hooks/useTypewriter";
import profilePhoto from "../assets/profile.jpg";

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 px-6">
      {/* background orbs */}
      <div className="absolute inset-0 dotted-grid opacity-30 pointer-events-none" />
      <div className="glow-orb w-96 h-96 bg-cyan-500/20 -top-20 -left-20" />
      <div className="glow-orb w-96 h-96 bg-purple-500/20 top-40 -right-10" />
      <div className="glow-orb w-72 h-72 bg-blue-500/10 bottom-0 left-1/3" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300 mb-10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Available for new projects
        </div>

        <div className="mx-auto mb-8 w-48 h-64 rounded-2xl border border-white/10 bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden animate-float-slow">
          <img
            src={profilePhoto}
            alt={NAME}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase gradient-text mb-4">
          {NAME}
        </h1>

        <p className="uppercase tracking-[0.2em] text-gray-400 text-sm sm:text-base mb-8 h-6">
          {role}
          <span className="animate-blink text-cyan-400">|</span>
        </p>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-6">
          <span className="text-white">Ship fast. Build smart. </span>
          <span className="text-cyan-400">Delight users.</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          I'm a <span className="text-white font-semibold">Full-Stack Engineer</span> specializing
          in Spring Boot &amp; React. I design robust backends, polished frontends, and delightful
          UX systems that scale.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-300 transition-colors"
          >
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
          >
            Get in touch <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
