"use client";

interface SectionDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function SectionDivider({
  from = "#FAFAF8",
  to = "#FFFFFF",
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={`relative w-full h-20 md:h-28 -mt-1 ${flip ? "rotate-180" : ""}`}
      style={{ background: to }}
    >
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,0 L0,60 Q180,120 360,80 T720,90 T1080,70 T1440,85 L1440,0 Z"
          fill={from}
        />
        <path
          d="M0,80 Q240,40 480,70 T960,50 T1440,65"
          stroke="#6C3CE1"
          strokeWidth="0.5"
          strokeOpacity="0.08"
          fill="none"
        />
        <path
          d="M0,90 Q300,60 600,80 T1200,60 T1440,75"
          stroke="#FF6B6B"
          strokeWidth="0.3"
          strokeOpacity="0.06"
          fill="none"
        />
      </svg>
    </div>
  );
}
