import { ArrowRight, Mail } from "lucide-react";
import { NAME, ROLES, HERO_TAGS } from "../data";
import { useTypewriter } from "../hooks/useTypewriter";
import profilePhoto from "../assets/profile.png";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import SplitWords from "./SplitWords";

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-24 px-6">
      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-[1.25fr_0.75fr] gap-16 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Reveal variant="down">
            <span className="chip !text-sm !text-teal mb-8">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-teal animate-ping-soft" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-teal" />
              </span>
              Available for new projects
            </span>
          </Reveal>

          <Reveal variant="words" delay={100}>
            <p className="font-heading font-bold text-xl text-muted mb-2">
              <SplitWords>Hi there, I'm</SplitWords>
            </p>
            <h1 className="font-heading font-black text-5xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[1.05] mb-6">
              {/* non-breaking space keeps "J. SHIJA" together when the name wraps */}
              <SplitWords step={140} start={250}>
                <span className="gradient-text">{NAME.replace(/ (?=\S+$)/, "\u00a0")}</span>
              </SplitWords>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="clay-in inline-flex items-center gap-3 px-5 py-3 mb-8 font-mono text-sm sm:text-base">
              <span className="text-pink font-bold">&gt;</span>
              <span className="text-ink font-semibold min-w-[1ch]">{role}</span>
              <span className="animate-blink text-violet -ml-2">▍</span>
            </div>
          </Reveal>

          <Reveal variant="words" delay={500}>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink mb-5">
              <SplitWords step={90}>
                Ship fast. Build smart. <span className="text-violet">Delight users.</span>
              </SplitWords>
            </h2>
          </Reveal>

          <Reveal variant="words" delay={900}>
            <p className="text-muted text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              <SplitWords step={18}>
                I'm a <span className="text-ink font-semibold">Full-Stack Engineer</span> specializing in
                Spring Boot &amp; React. I design robust backends, polished frontends, and delightful UX
                systems that scale.
              </SplitWords>
            </p>
          </Reveal>

          <Reveal delay={450} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
            {HERO_TAGS.map((tag) => (
              <span key={tag} className="chip !text-ink">
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal delay={500} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} className="btn-arrow" />
            </a>
            <a href="#contact" className="btn btn-soft">
              <Mail size={18} className="btn-fly" /> Get in touch
            </a>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal variant="zoom" delay={250} className="order-first lg:order-last mx-auto">
          {/* follows the pointer (mouse or finger) and glows around the edge */}
          <Tilt max={8} shift={12} touch className="rounded-[42px]">
            <div className="glow-frame">
              <div className="clay !rounded-[42px] p-3.5">
                <div className="overflow-hidden rounded-[30px] w-60 sm:w-72 aspect-[4/5]">
                  <img
                    src={profilePhoto}
                    alt={NAME}
                    draggable="false"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 w-7 h-11 rounded-full clay-in justify-center pt-2"
      >
        <span className="w-1.5 h-2.5 rounded-full bg-violet animate-bounce" />
      </a>
    </section>
  );
}
