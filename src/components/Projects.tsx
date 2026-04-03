"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/api";

const fallbackProjects: Project[] = [
  { id: 1, title: "Brand Identity Design", description: "Complete visual identity for a tech startup including logo, color palette, and marketing collateral.", thumbnail: "/projects/project1.jpg", category: "Graphic Design" },
  { id: 2, title: "YouTube Channel Rebrand", description: "Full channel rebrand with custom thumbnails, intro animations, and banner design.", thumbnail: "/projects/project2.jpg", category: "Video Editing" },
  { id: 3, title: "Product Launch Video", description: "Cinematic product launch video with 3D motion graphics and professional color grading.", thumbnail: "/projects/project3.jpg", category: "Video Editing" },
  { id: 4, title: "Social Media Campaign", description: "30-day social media content suite including reels, stories, and carousel posts.", thumbnail: "/projects/project4.jpg", category: "Social Media" },
  { id: 5, title: "Corporate Promo Video", description: "High-end corporate promotional video with aerial shots and executive interviews.", thumbnail: "/projects/project5.jpg", category: "Video Editing" },
  { id: 6, title: "E-Commerce Design Suite", description: "Product photography editing and banner designs for an online fashion store.", thumbnail: "/projects/project6.jpg", category: "Graphic Design" },
];

const categoryColors: Record<string, string> = {
  "Graphic Design": "bg-[#EDE9FE] text-[#6C3CE1]",
  "Video Editing": "bg-[#FFF0F0] text-[#FF6B6B]",
  "Social Media": "bg-[#FFFBEB] text-[#F59E0B]",
};

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const data = projects?.length ? projects : fallbackProjects;

  return (
    <section id="projects" className="relative py-16 md:py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Featured <span className="text-[#6C3CE1]">Projects</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <Image src={project.thumbnail} alt={project.title} fill className="object-cover" unoptimized />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${categoryColors[project.category] || "bg-stone-100 text-stone-600"}`}>
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#1A1A2E] mb-2 group-hover:text-[#6C3CE1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
