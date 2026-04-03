"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Organization } from "@/lib/api";

const fallbackOrgs: Organization[] = [
  { id: 1, name: "Creative Agency", logo: "", youtube_link: "#" },
  { id: 2, name: "Media House", logo: "", youtube_link: "#" },
  { id: 3, name: "Digital Studio", logo: "", youtube_link: "#" },
];

interface OrganizationsProps {
  organizations?: Organization[];
}

export default function Organizations({ organizations }: OrganizationsProps) {
  const data = organizations?.length ? organizations : fallbackOrgs;
  if (!data.length) return null;

  return (
    <section id="organizations" className="relative py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6">
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
            Trusted By
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Organizations I&apos;ve <span className="text-[#6C3CE1]">Worked With</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((org, index) => (
            <motion.a
              key={org.id}
              href={org.youtube_link || "#"}
              target={org.youtube_link ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 40px rgba(0,0,0,0.06)" }}
              className="group bg-white border border-stone-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center">
                {org.logo ? (
                  <Image src={org.logo} alt={org.name} width={80} height={80} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
                ) : (
                  <div className="w-14 h-14 bg-[#EDE9FE] rounded-xl flex items-center justify-center text-[#6C3CE1] font-bold text-xl font-[family-name:var(--font-heading)] group-hover:bg-[#6C3CE1] group-hover:text-white transition-all duration-300">
                    {org.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="text-stone-500 text-sm font-medium text-center group-hover:text-[#1A1A2E] transition-colors">
                {org.name}
              </p>
              {org.youtube_link && (
                <div className="flex items-center gap-1 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
