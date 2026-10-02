import { BookOpen, Server, Monitor, Cloud, Wrench, Layers } from "lucide-react";
import { SKILLS } from "../data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import SplitWords from "./SplitWords";

// Icon + tint per category; categories not listed here use FALLBACK.
const STYLE = {
  Backend: { icon: Server, tint: "var(--violet)" },
  Frontend: { icon: Monitor, tint: "var(--pink)" },
  DevOps: { icon: Cloud, tint: "var(--teal)" },
  Tools: { icon: Wrench, tint: "var(--amber)" },
};
const FALLBACK = { icon: Layers, tint: "var(--sky)" };

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Toolbox" icon={Layers} title="Skills &" highlight="Technologies">
          The languages, frameworks and tools I reach for to take products from idea to production.
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(SKILLS).map(([category, tags], i) => {
            const { icon: Icon, tint } = STYLE[category] ?? FALLBACK;
            return (
              <Reveal key={category} variant="card" delay={i * 150} className="h-full">
                <div className="group clay clay-hover h-full p-7">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="clay-icon !w-12 !h-12" style={{ "--c": tint }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-lg text-ink leading-tight">{category}</h3>
                      <p className="text-faint text-xs font-semibold">{tags.length} skills</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {tags.map((tag, ci) => (
                      <span key={tag} className="chip chip-hover !text-xs" style={{ "--ci": ci }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="zoom">
          <div
            className="clay !rounded-[36px] p-10 text-center text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7354f5, #c95bc9)",
              boxShadow:
                "0 26px 50px -18px color-mix(in srgb, var(--violet) 70%, transparent), inset -8px -8px 18px rgba(0,0,0,.18), inset 8px 8px 18px rgba(255,255,255,.3)",
            }}
          >
            <h3 className="relative font-heading font-black text-2xl sm:text-3xl mb-3">
              <SplitWords step={90} start={300}>Always Learning, Always Growing</SplitWords>
            </h3>
            <p className="relative text-white/85 max-w-xl mx-auto mb-7 leading-relaxed">
              I believe in continuous improvement and staying updated with the latest technologies and
              industry best practices.
            </p>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-5 py-2 text-sm font-semibold shadow-[inset_2px_2px_6px_rgba(255,255,255,.35),inset_-2px_-2px_6px_rgba(0,0,0,.12)]">
              <BookOpen size={16} />
              Currently pursuing additional certifications
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
