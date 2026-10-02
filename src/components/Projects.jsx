import { Plus, ExternalLink, Rocket } from "lucide-react";
import { PROJECTS } from "../data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Tilt from "./Tilt";

function EmptySlot() {
  return (
    <div className="group clay-in h-full !rounded-[30px] flex flex-col items-center justify-center text-center p-10 min-h-[300px] border-2 border-dashed border-faint/30 transition-colors duration-500 hover:border-violet/50">
      <div className="clay-sm w-14 h-14 !rounded-full grid place-items-center mb-5 text-faint transition-all duration-500 group-hover:rotate-90 group-hover:text-violet">
        <Plus size={24} />
      </div>
      <p className="text-muted text-sm font-semibold mb-1">Something great is coming</p>
      <p className="text-faint text-xs">
        Add a project in <code className="text-violet">src/data.js</code>
      </p>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Tilt max={8} className="h-full rounded-[30px]">
      <article className="group clay h-full overflow-hidden flex flex-col">
        <div className="p-3 pb-0">
          <div className="relative h-48 overflow-hidden rounded-[22px]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div
                className="h-full w-full grid place-items-center"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--violet) 30%, var(--surface)), color-mix(in srgb, var(--pink) 30%, var(--surface)))",
                }}
              >
                <span className="font-heading font-black text-ink/60 text-lg">{project.category}</span>
              </div>
            )}
            {project.status && (
              <span className="absolute top-3 right-3 chip !text-teal !text-xs !py-1.5">
                <span className="w-2 h-2 rounded-full bg-teal" />
                {project.status}
              </span>
            )}
          </div>
        </div>
        <div className="p-7 flex flex-col flex-1">
          {project.category && (
            <p className="text-violet text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
          )}
          <h3 className="font-heading font-extrabold text-xl text-ink mb-3">{project.title}</h3>
          <p className="text-muted text-sm mb-5 leading-relaxed flex-1">{project.description}</p>
          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="chip !text-xs !py-1">
                  {t}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary self-start !py-2.5 !text-sm"
            >
              Visit Site <ExternalLink size={15} className="btn-fly" />
            </a>
          )}
        </div>
      </article>
    </Tilt>
  );
}

export default function Projects() {
  const slots = PROJECTS.length > 0 ? PROJECTS : [null, null, null];

  return (
    <section id="projects" className="px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Featured Work" icon={Rocket} title="Projects That Make" highlight="Impact">
          Live products I've built — from travel platforms to e-learning ecosystems — solving real
          problems for real users.
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {slots.map((project, i) => (
            <Reveal key={project?.title ?? i} variant="card" delay={i * 150} className="h-full">
              {project ? <ProjectCard project={project} /> : <EmptySlot />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
