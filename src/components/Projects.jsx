import { Plus, ExternalLink } from "lucide-react";
import { PROJECTS } from "../data";

function EmptySlot() {
  return (
    <div className="card border-dashed flex flex-col items-center justify-center text-center p-10 min-h-[280px]">
      <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Plus size={20} className="text-gray-500" />
      </div>
      <p className="text-gray-500 text-sm">
        Add a project in <code className="text-cyan-400/80">src/data.js</code>
      </p>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="card overflow-hidden group">
      {project.image ? (
        <img src={project.image} alt={project.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <span className="text-gray-600 text-sm">{project.category}</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg">{project.title}</h3>
          {project.status && (
            <span className="rounded-full bg-green-500/15 text-green-400 text-xs px-2.5 py-1">
              {project.status}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-gray-300"
              >
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
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-colors"
          >
            Visit Site <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const slots = PROJECTS.length > 0 ? PROJECTS : [null, null, null];

  return (
    <section id="projects" className="px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
          Featured Work
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
          Projects That Make Impact
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed">
          Live products I've built — from travel platforms to e-learning ecosystems — solving real
          problems for real users.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {slots.map((project, i) =>
            project ? (
              <ProjectCard key={project.title} project={project} />
            ) : (
              <EmptySlot key={i} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
