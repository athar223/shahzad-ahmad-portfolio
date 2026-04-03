"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import WaveLines from "./WaveLines";

const cubicEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const letterAnimation = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.04,
      ease: cubicEase,
    },
  }),
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnimation}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ perspective: 500 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

import type { SiteSettings } from "@/lib/api";

interface HeroProps {
  settings?: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const cvUrl = settings?.cv_file;
  const profileImage = settings?.profile_image;
  const line1 = settings?.hero_title_line1 || "Shahzad";
  const line2 = settings?.hero_title_line2 || "Ahmad";
  const subtitle = settings?.hero_subtitle || "Professional Video Editor & Graphic Designer crafting stunning visual experiences that captivate and inspire.";
  const stats = [
    { label: settings?.stat1_label || "Years Experience", value: settings?.stat1_value || "5+" },
    { label: settings?.stat2_label || "Projects Completed", value: settings?.stat2_value || "1000+" },
  ];
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF8]"
    >
      {/* Soft background shapes */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#6C3CE1]/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#FF6B6B]/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-[120px]"
        />
      </div>

      <WaveLines variant="both" />

      {/* Floating dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#6C3CE1]/15 rounded-full"
          style={{ top: `${15 + i * 15}%`, left: `${5 + i * 20}%` }}
          animate={{ y: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 md:mb-6 text-[#1A1A2E]">
            <AnimatedText text={line1} />
            <br />
            <AnimatedText
              text={line2}
              className="text-[#6C3CE1]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-stone-500 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mb-8 md:mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(108, 60, 225, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#6C3CE1] text-white rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
            >
              View Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-stone-200 text-[#1A1A2E] rounded-full font-medium hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all duration-300 text-sm sm:text-base"
            >
              Contact Me
            </motion.a>
            {cvUrl && (
              <motion.a
                href={cvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-[#FFF8F0] border-2 border-[#FF6B6B]/20 text-[#FF6B6B] rounded-full font-medium hover:bg-[#FF6B6B] hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </motion.a>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex gap-8 sm:gap-12 justify-center md:justify-start"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.15, type: "spring", stiffness: 200 }}
              >
                <p className="font-[family-name:var(--font-mono)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#6C3CE1]">
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-sub)] text-stone-400 text-sm mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Profile Image with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          className="flex justify-center order-1 md:order-2"
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <motion.div style={{ rotateX, rotateY }} className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(108, 60, 225, 0.12)",
                  "0 0 80px rgba(255, 107, 107, 0.1)",
                  "0 0 60px rgba(108, 60, 225, 0.12)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 rounded-full"
            />
            <div className="absolute -inset-4 bg-gradient-to-br from-[#6C3CE1]/15 to-[#FF6B6B]/10 rounded-full blur-2xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-[#6C3CE1]/15"
            />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-[#6C3CE1]/10">
              <Image
                src={profileImage || "/profile.jpg"}
                alt="Shahzad Ahmad"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-stone-400 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#6C3CE1] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
