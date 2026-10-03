import { Resend } from "resend";

// Server-side only: the API key never reaches the browser.
// Set RESEND_API_KEY in .env.local (local dev) or your host's environment settings.
const TO = "jafarishija18@gmail.com";
// Resend's shared test sender; swap for an address on your own verified domain later.
const FROM = "Portfolio Contact <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** POST /api/contact  { name, email, subject?, message, website? } */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const field = (k) => String(body[k] ?? "").trim();
  const name = field("name");
  const email = field("email");
  const subject = field("subject") || "Project inquiry";
  const message = field("message");

  // Honeypot: real visitors never see or fill this field; bots usually do.
  if (field("website")) return res.status(200).json({ ok: true });

  if (!name || !email || !message) return res.status(400).json({ error: "Name, email and message are required." });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Please enter a valid email address." });
  for (const [k, max] of Object.entries(LIMITS)) {
    if (field(k).length > max) return res.status(400).json({ error: `The ${k} is too long.` });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email, // hitting "Reply" in your inbox answers the visitor directly
    subject: `[Portfolio] ${subject}`,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(502).json({ error: "Could not send your message. Please try again." });
  }
  return res.status(200).json({ ok: true, id: data?.id });
}
