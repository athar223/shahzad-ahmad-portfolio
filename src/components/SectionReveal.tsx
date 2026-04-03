"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export default function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
