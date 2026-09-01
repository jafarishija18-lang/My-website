import { Award, Plus } from "lucide-react";
import { CERTIFICATIONS } from "../data";

function EmptySlot() {
  return (
    <div className="card border-dashed flex flex-col items-center justify-center text-center p-8 min-h-[180px]">
      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
        <Plus size={18} className="text-gray-500" />
      </div>
      <p className="text-gray-500 text-sm">
        Add a certification in <code className="text-cyan-400/80">src/data.js</code>
      </p>
    </div>
  );
}

function CertCard({ cert }) {
  return (
    <div className="card p-6 text-left">
      <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center mb-4">
        <Award size={18} className="text-purple-400" />
      </div>
      <h3 className="font-heading font-semibold mb-1">{cert.title}</h3>
      <p className="text-gray-400 text-sm mb-3">
        {cert.issuer} · {cert.year}
      </p>
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 text-sm hover:underline"
        >
          Verify ↗
        </a>
      )}
    </div>
  );
}

export default function Certifications() {
  const slots = CERTIFICATIONS.length > 0 ? CERTIFICATIONS : [null, null, null];

  return (
    <section id="certifications" className="px-6 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
          <Award size={14} /> Certifications &amp; Badges
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
          Professional Achievements
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed">
          Continuous learning and professional development through industry-recognized
          certifications and specialized training programs.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((cert, i) => (cert ? <CertCard key={cert.title} cert={cert} /> : <EmptySlot key={i} />))}
        </div>
      </div>
    </section>
  );
}
