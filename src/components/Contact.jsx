import { useState } from "react";
import { Mail, Send, Download, CalendarClock, Phone, Clock, Copy, Check, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import { CONTACT, SCHEDULE_CALL_URL, RESUME_URL } from "../data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import SplitWords from "./SplitWords";

const SOCIALS = [
  { label: "GitHub", href: CONTACT.github, icon: GithubIcon, tint: "var(--ink)" },
  { label: "LinkedIn", href: CONTACT.linkedin, icon: LinkedinIcon, tint: "var(--sky)" },
  { label: "Instagram", href: CONTACT.instagram, icon: InstagramIcon, tint: "var(--pink)" },
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable (e.g. insecure context) — nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className="btn btn-soft !p-0 w-9 h-9 !rounded-xl shrink-0"
    >
      <Copy size={15} className={`absolute transition-all duration-300 ${copied ? "scale-0 opacity-0" : ""}`} />
      <Check
        size={16}
        className={`absolute text-teal transition-all duration-300 ${copied ? "" : "scale-0 opacity-0"}`}
      />
    </button>
  );
}

function InfoRow({ icon: Icon, tint, label, value, copy }) {
  return (
    <div className="group flex items-center gap-3 sm:gap-4">
      <div className="clay-icon !w-11 !h-11 !rounded-[14px]" style={{ "--c": tint }}>
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-faint text-xs font-bold uppercase tracking-wider">{label}</p>
        <p className="text-ink font-semibold text-sm sm:text-base [overflow-wrap:anywhere]">{value}</p>
      </div>
      {copy && <CopyButton value={value} />}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      form.subject || "Project inquiry"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  // Force a file download instead of opening the PDF in a browser viewer:
  // re-wrap it as a generic binary so no browser tries to display it.
  const downloadResume = async (e) => {
    e.preventDefault();
    const filename = RESUME_URL.split("/").pop();
    try {
      const res = await fetch(RESUME_URL);
      if (!res.ok) throw new Error(res.statusText);
      const blob = new Blob([await res.arrayBuffer()], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href: url, download: filename });
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      window.location.href = RESUME_URL; // last resort: let the browser handle it
    }
  };

  const scheduleHref =
    SCHEDULE_CALL_URL || `mailto:${CONTACT.email}?subject=${encodeURIComponent("Schedule a call")}`;

  return (
    <section id="contact" className="px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Get In Touch" icon={MessageCircle} title="Let's Build Something" highlight="Amazing">
          Ready to bring your ideas to life? I'm always excited to discuss new projects and
          opportunities to create exceptional digital experiences.
        </SectionHeader>

        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-8 mb-16">
          <div className="flex flex-col gap-8">
            <Reveal variant="card" className="clay p-6 sm:p-8">
              <h3 className="font-heading font-extrabold text-xl text-ink mb-7">Quick Contact</h3>
              <div className="flex flex-col gap-6">
                <InfoRow icon={Mail} tint="var(--violet)" label="Email" value={CONTACT.email} copy />
                <InfoRow icon={Phone} tint="var(--teal)" label="Phone" value={CONTACT.phone} copy />
                <InfoRow icon={Clock} tint="var(--amber)" label="Response Time" value={CONTACT.responseTime} />
              </div>
            </Reveal>

            <Reveal variant="card" delay={300} className="clay p-6 sm:p-8">
              <h3 className="font-heading font-extrabold text-xl text-ink mb-6">Connect</h3>
              <div className="grid grid-cols-3 gap-4">
                {SOCIALS.map(({ label, href, icon: Icon, tint }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="btn btn-soft group/s flex-col !gap-2 !py-4 !px-2 !text-xs !text-muted"
                  >
                    <span
                      className="transition-transform duration-500 group-hover/s:scale-125 group-hover/s:-rotate-6"
                      style={{ color: tint }}
                    >
                      <Icon size={22} />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal variant="card" delay={150} as="form" onSubmit={handleSubmit} className="clay p-6 sm:p-10">
            <h3 className="font-heading font-extrabold text-xl text-ink mb-2">Send a Message</h3>
            <p className="text-muted text-sm mb-8">Fill this in and your email app will open with it ready to send.</p>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <label className="block">
                <span className="block text-sm font-bold text-muted mb-2 ml-1">Name</span>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-bold text-muted mb-2 ml-1">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="field"
                />
              </label>
            </div>
            <label className="block mb-5">
              <span className="block text-sm font-bold text-muted mb-2 ml-1">Subject</span>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                className="field"
              />
            </label>
            <label className="block mb-8">
              <span className="block text-sm font-bold text-muted mb-2 ml-1">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                className="field resize-none"
              />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" className="btn btn-primary">
                <Send size={17} className="btn-fly" /> Send Message
              </button>
              <p
                role="status"
                className={`inline-flex items-center gap-2 text-sm font-semibold text-teal transition-all duration-500 ${
                  sent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                }`}
              >
                {sent && (
                  <>
                    <Check size={16} /> Opening your email app…
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="zoom">
          <div
            className="clay !rounded-[40px] px-8 py-14 text-center text-white overflow-hidden max-w-3xl mx-auto"
            style={{
              background: "linear-gradient(135deg, #129a8b, #2384c8)",
              boxShadow:
                "0 26px 50px -18px color-mix(in srgb, var(--teal) 70%, transparent), inset -8px -8px 18px rgba(0,0,0,.16), inset 8px 8px 18px rgba(255,255,255,.3)",
            }}
          >
            <h3 className="relative font-heading font-black text-3xl mb-3">
              <SplitWords step={90} start={300}>Ready to Start Your Project?</SplitWords>
            </h3>
            <p className="relative text-white/90 mb-8 leading-relaxed">
              Download my resume or schedule a quick call to discuss your needs.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <a href={RESUME_URL} download onClick={downloadResume} className="btn bg-white !text-[#0f766e] shadow-[0_12px_24px_-8px_rgba(0,0,0,.3),inset_-3px_-3px_8px_rgba(0,0,0,.08)]">
                <Download size={17} className="btn-arrow" /> Download Resume
              </a>
              <a
                href={scheduleHref}
                target={SCHEDULE_CALL_URL ? "_blank" : undefined}
                rel={SCHEDULE_CALL_URL ? "noreferrer" : undefined}
                className="btn text-white bg-white/15 shadow-[inset_3px_3px_8px_rgba(255,255,255,.3),inset_-3px_-3px_8px_rgba(0,0,0,.12)] hover:bg-white/25"
              >
                <CalendarClock size={17} /> Schedule Call
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
