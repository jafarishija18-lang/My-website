import { Code2, Zap, Database, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Code2,
    title: "Clean Architecture",
    desc: "I write maintainable, testable code that stands the test of time and scale.",
  },
  {
    icon: Zap,
    title: "Performance First",
    desc: "Optimized applications that load fast and feel responsive on every device.",
  },
  {
    icon: Database,
    title: "Full-Stack Expertise",
    desc: "From database design to user interfaces, I handle the complete development stack.",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    desc: "Building experiences that users love, backed by solid engineering principles.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
          About
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
          Crafting Digital Experiences
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed">
          With expertise spanning modern web technologies, I build applications that are both
          beautiful and battle-tested, delivering exceptional user experiences at scale.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-cyan-400" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
