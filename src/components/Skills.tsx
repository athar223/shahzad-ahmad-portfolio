"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WaveLines from "./WaveLines";

const fallbackSkills = [
  { id: 1, name: "Adobe Premiere Pro", proficiency: 95, color: "from-[#6C3CE1] to-[#9B6DFF]" },
  { id: 2, name: "After Effects", proficiency: 90, color: "from-[#6366F1] to-[#818CF8]" },
  { id: 3, name: "Adobe Photoshop", proficiency: 92, color: "from-[#0EA5E9] to-[#67E8F9]" },
  { id: 4, name: "Adobe Illustrator", proficiency: 88, color: "from-[#F59E0B] to-[#FBBF24]" },
  { id: 5, name: "DaVinci Resolve", proficiency: 85, color: "from-[#FF6B6B] to-[#FCA5A5]" },
  { id: 6, name: "Figma", proficiency: 80, color: "from-[#EC4899] to-[#F9A8D4]" },
];

interface SkillsProps {
  skills?: { id: number; name: string; proficiency: number }[];
}

function AnimatedCounter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: delay + 0.5 }}
      className="font-[family-name:var(--font-mono)] text-[#6C3CE1] font-bold text-sm"
    >
      {value}%
    </motion.span>
  );
}

export default function Skills({ skills }: SkillsProps) {
  const data = skills?.length ? skills : fallbackSkills;

  return (
    <section id="skills" className="relative py-16 md:py-28 bg-white overflow-hidden">
      <WaveLines variant="bottom" color="#FF6B6B" opacity={0.03} />
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
            Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            My <span className="text-[#6C3CE1]">Skills</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.map((skill, index) => {
            const colors = fallbackSkills[index]?.color || "from-[#6C3CE1] to-[#9B6DFF]";
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
                className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-[family-name:var(--font-heading)] text-[#1A1A2E] font-semibold">{skill.name}</h3>
                  <AnimatedCounter value={skill.proficiency} delay={index * 0.1} />
                </div>
                <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${colors} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
