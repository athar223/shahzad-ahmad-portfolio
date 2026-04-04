"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteSettings } from "@/lib/api";
import WaveLines from "./WaveLines";

interface ContactProps {
  settings?: SiteSettings;
}

export default function Contact({ settings }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const email = settings?.email || "contact@shahzadahmad.com";
  const phone = settings?.phone || "";
  const location = settings?.location || "Pakistan";
  const whatsapp = settings?.whatsapp_number || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const res = await fetch(`${apiUrl}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const socials = [
    { name: "YouTube", href: settings?.youtube_url || "", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
    { name: "Instagram", href: settings?.instagram_url || "", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
    { name: "LinkedIn", href: settings?.linkedin_url || "", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
    { name: "Twitter", href: settings?.twitter_url || "", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { name: "Facebook", href: settings?.facebook_url || "", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  ].filter((s) => s.href);

  const inputClass = (field: string) =>
    `w-full px-5 py-4 bg-[#FAFAF8] border rounded-2xl text-[#1A1A2E] placeholder-stone-400 focus:outline-none transition-all duration-300 ${
      focused === field
        ? "border-[#6C3CE1] shadow-lg shadow-[#6C3CE1]/10 bg-white"
        : "border-stone-200 hover:border-stone-300"
    }`;

  return (
    <section id="contact" className="relative py-16 md:py-28 bg-white overflow-hidden">
      <WaveLines variant="both" color="#6C3CE1" opacity={0.03} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-[family-name:var(--font-sub)] text-[#6C3CE1] text-sm uppercase mb-4 font-semibold tracking-widest"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Let&apos;s Work <span className="text-[#6C3CE1]">Together</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            {[
              { name: "name", type: "text", placeholder: "Your Name" },
              { name: "email", type: "email", placeholder: "Your Email" },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  className={inputClass(field.name)}
                />
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`${inputClass("message")} resize-none`}
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(108, 60, 225, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 sm:py-4 bg-[#6C3CE1] text-white rounded-2xl font-semibold hover:bg-[#5B2DC9] transition-all duration-300 disabled:opacity-50 text-sm sm:text-base mx-auto block"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : status === "error" ? "Failed — Try Again" : "Send Message"}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="bg-[#FAFAF8] border border-stone-100 rounded-3xl p-8 space-y-8">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-[#1A1A2E] font-bold text-lg mb-2">Let&apos;s create something amazing</h3>
                <p className="text-stone-500 leading-relaxed">Whether you need a stunning video edit, eye-catching graphics, or a complete visual identity — I&apos;m here to bring your vision to life.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EDE9FE] rounded-xl flex items-center justify-center text-[#6C3CE1]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div><p className="text-stone-400 text-sm">Email</p><p className="text-[#1A1A2E] font-medium">{email}</p></div>
                </div>

                {phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EDE9FE] rounded-xl flex items-center justify-center text-[#6C3CE1]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div><p className="text-stone-400 text-sm">Phone</p><p className="text-[#1A1A2E] font-medium">{phone}</p></div>
                  </div>
                )}

                {whatsapp && (
                  <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <div><p className="text-stone-400 text-sm">WhatsApp</p><p className="text-[#1A1A2E] font-medium group-hover:text-green-600 transition-colors">{whatsapp}</p></div>
                  </a>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FFF0F0] rounded-xl flex items-center justify-center text-[#FF6B6B]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div><p className="text-stone-400 text-sm">Location</p><p className="text-[#1A1A2E] font-medium">{location}</p></div>
                </div>
              </div>

              {socials.length > 0 && (
                <div>
                  <p className="text-stone-400 text-sm mb-4">Follow Me</p>
                  <div className="flex gap-3">
                    {socials.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white border border-stone-200 hover:bg-[#6C3CE1] hover:border-[#6C3CE1] rounded-xl flex items-center justify-center text-stone-400 hover:text-white transition-all duration-300 shadow-sm"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
