import { Award, Plus, BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TINTS = ["var(--violet)", "var(--teal)", "var(--pink)", "var(--amber)", "var(--sky)"];

function EmptySlot() {
  return (
    <div className="group clay-in h-full !rounded-[30px] flex flex-col items-center justify-center text-center p-8 min-h-[200px] border-2 border-dashed border-faint/30 transition-colors duration-500 hover:border-violet/50">
      <div className="clay-sm w-12 h-12 !rounded-full grid place-items-center mb-4 text-faint transition-all duration-500 group-hover:rotate-90 group-hover:text-violet">
        <Plus size={20} />
      </div>
      <p className="text-faint text-sm">
        Add a certification in <code className="text-violet">src/data.js</code>
      </p>
    </div>
  );
}

function CertCard({ cert, tint }) {
  return (
    <div className="group clay clay-hover h-full p-7">
      <div className="flex items-start justify-between mb-6">
        <div className="clay-icon" style={{ "--c": tint }}>
          <Award size={22} />
        </div>
        {cert.year && <span className="chip !text-xs !py-1">{cert.year}</span>}
      </div>
      <h3 className="font-heading font-extrabold text-lg text-ink mb-1">{cert.title}</h3>
      <p className="text-muted text-sm mb-5">{cert.issuer}</p>
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-violet text-sm font-bold hover:gap-2.5 transition-all"
        >
          <BadgeCheck size={16} /> Verify credential
        </a>
      )}
    </div>
  );
}

export default function Certifications() {
  const slots = CERTIFICATIONS.length > 0 ? CERTIFICATIONS : [null, null, null];

  return (
    <section id="certifications" className="px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Certifications & Badges" icon={Award} title="Professional" highlight="Achievements">
          Continuous learning and professional development through industry-recognized
          certifications and specialized training programs.
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {slots.map((cert, i) => (
            <Reveal key={cert?.title ?? i} variant="card" delay={i * 150} className="h-full">
              {cert ? <CertCard cert={cert} tint={TINTS[i % TINTS.length]} /> : <EmptySlot />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
