import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

export default function SectionHeader({ eyebrow, icon: Icon, title, highlight, children }) {
  return (
    <div className="text-center mb-16">
      <Reveal variant="pop">
        <span className="eyebrow mb-6">
          {Icon && <Icon size={14} />} {eyebrow}
        </span>
      </Reveal>
      <Reveal variant="words" delay={150}>
        <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-ink mb-5">
          <SplitWords step={80}>
            {title} {highlight && <span className="gradient-text">{highlight}</span>}
          </SplitWords>
        </h2>
      </Reveal>
      {children && (
        <Reveal variant="words" delay={450}>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed text-lg">
            <SplitWords step={18}>{children}</SplitWords>
          </p>
        </Reveal>
      )}
    </div>
  );
}
