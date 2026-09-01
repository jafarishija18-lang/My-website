import { useState } from "react";
import { Mail, Send, Download, CalendarClock } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import { CONTACT, SCHEDULE_CALL_URL, RESUME_URL } from "../data";

const SOCIALS = [
  { label: "GitHub", href: CONTACT.github, icon: GithubIcon },
  { label: "LinkedIn", href: CONTACT.linkedin, icon: LinkedinIcon },
  { label: "Instagram", href: CONTACT.instagram, icon: InstagramIcon },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      form.subject || "Project inquiry"
    )}&body=${encodeURIComponent(body)}`;
  };

  const scheduleHref =
    SCHEDULE_CALL_URL || `mailto:${CONTACT.email}?subject=${encodeURIComponent("Schedule a call")}`;

  return (
    <section id="contact" className="px-6 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
          Get In Touch
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
          Let's Build Something Amazing
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed">
          Ready to bring your ideas to life? I'm always excited to discuss new projects and
          opportunities to create exceptional digital experiences.
        </p>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 text-left mb-10">
          <div className="flex flex-col gap-6">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-heading font-semibold mb-5">
                <Mail size={18} className="text-cyan-400" /> Quick Contact
              </h3>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Email</p>
              <p className="text-white mb-4 break-all">{CONTACT.email}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Phone</p>
              <p className="text-white mb-4">{CONTACT.phone}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Response Time</p>
              <p className="text-white">{CONTACT.responseTime}</p>
            </div>

            <div className="card p-6">
              <h3 className="font-heading font-semibold mb-5">Connect</h3>
              <div className="flex flex-col gap-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 hover:border-cyan-400/40 hover:text-white transition-colors"
                  >
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
            <h3 className="font-heading font-semibold text-lg mb-6">Send a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-colors"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

        <div className="card p-8 text-center max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-xl mb-3">Ready to Start Your Project?</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Download my resume or schedule a quick call to discuss your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href={scheduleHref}
              target={SCHEDULE_CALL_URL ? "_blank" : undefined}
              rel={SCHEDULE_CALL_URL ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
            >
              <CalendarClock size={16} /> Schedule Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
