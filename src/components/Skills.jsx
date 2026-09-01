import { BookOpen } from "lucide-react";
import { SKILLS } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(SKILLS).map(([category, tags]) => (
            <div key={category} className="card p-6">
              <h3 className="font-heading font-semibold text-cyan-400 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-8 text-center">
          <h3 className="font-heading font-bold text-xl mb-3">
            Always Learning, Always Growing
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-5 leading-relaxed">
            I believe in continuous improvement and staying updated with the latest technologies
            and industry best practices.
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-300">
            <BookOpen size={14} className="text-cyan-400" />
            Currently pursuing additional certifications
          </span>
        </div>
      </div>
    </section>
  );
}
