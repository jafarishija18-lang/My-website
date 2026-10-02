import { Code2, Zap, Database, Users, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import SplitWords from "./SplitWords";

const FEATURES = [
  {
    icon: Code2,
    tint: "var(--violet)",
    title: "Clean Architecture",
    desc: "I write maintainable, testable code that stands the test of time and scale.",
  },
  {
    icon: Zap,
    tint: "var(--amber)",
    title: "Performance First",
    desc: "Optimized applications that load fast and feel responsive on every device.",
  },
  {
    icon: Database,
    tint: "var(--teal)",
    title: "Full-Stack Expertise",
    desc: "From database design to user interfaces, I handle the complete development stack.",
  },
  {
    icon: Users,
    tint: "var(--pink)",
    title: "User-Centric Design",
    desc: "Building experiences that users love, backed by solid engineering principles.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="About" icon={Sparkles} title="Crafting Digital" highlight="Experiences">
          With expertise spanning modern web technologies, I build applications that are both
          beautiful and battle-tested, delivering exceptional user experiences at scale.
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-8">
          {FEATURES.map(({ icon: Icon, tint, title, desc }, i) => (
            <Reveal key={title} variant="card" delay={i * 150} className="h-full">
              <div className="group clay clay-hover h-full p-8 overflow-hidden">
                <span
                  className="absolute right-6 top-4 font-heading font-black text-7xl opacity-[0.09] select-none transition-transform duration-700 group-hover:-translate-x-3"
                  style={{ color: tint }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div className="clay-icon mb-6" style={{ "--c": tint }}>
                  <Icon size={24} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-ink mb-3">
                  <SplitWords step={70} start={250}>{title}</SplitWords>
                </h3>
                <p className="text-muted leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
