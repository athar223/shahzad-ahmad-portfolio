"use client";

import { motion } from "framer-motion";
import WaveLines from "./WaveLines";
import type { SiteSettings, ExpertiseItem } from "@/lib/api";

const cubicEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const expertise = [
  {
    title: "Video Editing",
    description:
      "Transforming raw footage into compelling visual stories with seamless transitions, color grading, and sound design.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: "#6C3CE1",
    bg: "#EDE9FE",
  },
  {
    title: "Graphic Design",
    description:
      "Creating visually stunning designs for brands, from logos and brand identity to marketing materials and digital art.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "#FF6B6B",
    bg: "#FFF0F0",
  },
  {
    title: "Social Media Content",
    description:
      "Designing scroll-stopping content optimized for every platform — reels, thumbnails, stories, and engaging posts.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m10-4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicEase },
  },
};

const iconMap: Record<string, React.ReactNode> = {
  video: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  image: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  calendar: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m10-4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  camera: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  code: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  palette: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
};

const colorCycle = [
  { color: "#6C3CE1", bg: "#EDE9FE" },
  { color: "#FF6B6B", bg: "#FFF0F0" },
  { color: "#F59E0B", bg: "#FFFBEB" },
  { color: "#0EA5E9", bg: "#F0F9FF" },
  { color: "#10B981", bg: "#ECFDF5" },
];

interface AboutProps {
  settings?: SiteSettings;
  expertise?: ExpertiseItem[];
}

export default function About({ settings, expertise: dynamicExpertise }: AboutProps) {
  const bio = settings?.about_bio || "I'm Shahzad Ahmad, a passionate video editor and graphic designer with over 5 years of experience. I specialize in creating high-quality visual content that helps brands stand out and connect with their audiences.";

  const expertiseData = dynamicExpertise?.length
    ? dynamicExpertise.map((e, i) => ({
        title: e.title,
        description: e.description,
        icon: iconMap[e.icon_name] || iconMap.video,
        color: colorCycle[i % colorCycle.length].color,
        bg: colorCycle[i % colorCycle.length].bg,
      }))
    : expertise.map((e) => ({ ...e }));
  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden">
      <WaveLines variant="top" color="#6C3CE1" opacity={0.03} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            About Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6"
          >
            Crafting Visual <span className="text-[#6C3CE1]">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            {bio}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {expertiseData.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="group bg-white border border-stone-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                {item.icon}
              </motion.div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1A1A2E] mb-3">
                {item.title}
              </h3>
              <p className="text-stone-500 leading-relaxed">{item.description}</p>

              <div
                className="absolute top-4 right-4 text-6xl font-extrabold opacity-[0.04] font-[family-name:var(--font-heading)]"
                style={{ color: item.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
