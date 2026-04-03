"use client";

import { motion } from "framer-motion";

interface WaveLinesProps {
  variant?: "top" | "bottom" | "both";
  color?: string;
  opacity?: number;
}

export default function WaveLines({
  variant = "both",
  color = "#6C3CE1",
  opacity = 0.04,
}: WaveLinesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {(variant === "top" || variant === "both") && (
        <>
          <motion.svg
            className="absolute top-0 left-0 w-[200%] h-40"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            animate={{ x: [0, -720] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M0,80 C120,120 240,40 360,80 C480,120 600,40 720,80 C840,120 960,40 1080,80 C1200,120 1320,40 1440,80"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity={opacity}
            />
          </motion.svg>
          <motion.svg
            className="absolute top-8 left-0 w-[200%] h-40"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            animate={{ x: [-720, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M0,80 C160,30 320,130 480,80 C640,30 800,130 960,80 C1120,30 1280,130 1440,80"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={opacity * 0.7}
            />
          </motion.svg>
          <motion.svg
            className="absolute top-16 left-0 w-[200%] h-40"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            animate={{ x: [0, -720] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M0,90 C180,50 360,120 540,80 C720,40 900,110 1080,70 C1260,30 1350,100 1440,90"
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              opacity={opacity * 0.5}
            />
          </motion.svg>
        </>
      )}

      {(variant === "bottom" || variant === "both") && (
        <>
          <motion.svg
            className="absolute bottom-0 left-0 w-[200%] h-40"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            animate={{ x: [-720, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M0,80 C120,40 240,120 360,80 C480,40 600,120 720,80 C840,40 960,120 1080,80 C1200,40 1320,120 1440,80"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity={opacity}
            />
          </motion.svg>
          <motion.svg
            className="absolute bottom-10 left-0 w-[200%] h-40"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            animate={{ x: [0, -720] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M0,70 C200,110 400,50 600,80 C800,110 1000,50 1200,80 C1300,95 1370,65 1440,70"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={opacity * 0.6}
            />
          </motion.svg>
        </>
      )}
    </div>
  );
}
