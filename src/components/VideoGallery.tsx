"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Video } from "@/lib/api";

const categories = [
  { id: "reels", label: "Reels Editing", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { id: "podcast", label: "Podcast Editing", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
  { id: "documentary", label: "Documentary Editing", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
];

const fallbackVideos: Record<string, Video[]> = {
  reels: [
    { id: 1, title: "Instagram Reel — Product Showcase", category: "reels", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Fast-paced product showcase reel with dynamic transitions." },
    { id: 2, title: "Trending Reel Edit", category: "reels", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Viral-style reel with beat-synced cuts and effects." },
    { id: 3, title: "Brand Story Reel", category: "reels", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Cinematic brand storytelling in 30-second reel format." },
  ],
  podcast: [
    { id: 4, title: "Tech Talk Episode", category: "podcast", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Multi-cam podcast edit with animated captions." },
    { id: 5, title: "Interview Highlight", category: "podcast", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Key moments from a 2-hour podcast, condensed." },
    { id: 6, title: "Podcast Clips Package", category: "podcast", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Social media clips package from a podcast episode." },
  ],
  documentary: [
    { id: 7, title: "Cultural Heritage Doc", category: "documentary", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Short documentary exploring local cultural heritage." },
    { id: 8, title: "Behind The Scenes", category: "documentary", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Behind-the-scenes documentary of a creative project." },
    { id: 9, title: "Travel Documentary", category: "documentary", embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", video_file: "", thumbnail: "", description: "Cinematic travel documentary with narration." },
  ],
};

interface VideoGalleryProps {
  videos?: Video[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeTab, setActiveTab] = useState("reels");

  const getVideosForCategory = (cat: string): Video[] => {
    if (videos && videos.length > 0) {
      const filtered = videos.filter((v) => v.category === cat);
      return filtered.length > 0 ? filtered : [];
    }
    return fallbackVideos[cat] || [];
  };

  const currentVideos = getVideosForCategory(activeTab);

  return (
    <section id="videos" className="relative py-28 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-[family-name:var(--font-sub)] text-[#6C3CE1] text-sm uppercase mb-4 font-medium"
          >
            Showreel
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Video <span className="text-[#6C3CE1]">Gallery</span>
          </motion.h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 rounded-2xl text-sm font-semibold font-[family-name:var(--font-sub)] transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === cat.id
                  ? "bg-[#6C3CE1] text-white shadow-lg shadow-[#6C3CE1]/20"
                  : "bg-white text-stone-500 border border-stone-200 hover:border-[#6C3CE1]/30 hover:text-[#6C3CE1]"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
              </svg>
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeVideoTab"
                  className="absolute inset-0 bg-[#6C3CE1] rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Videos Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-6"
          >
            {currentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-500"
              >
                <div className="relative aspect-video bg-stone-50">
                  {video.video_file ? (
                    <video
                      controls
                      poster={video.thumbnail || undefined}
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-contain"
                    >
                      <source src={video.video_file} type="video/mp4" />
                      <source src={video.video_file} type="video/webm" />
                    </video>
                  ) : (
                    <iframe
                      src={video.embed_url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#6C3CE1] bg-[#EDE9FE] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase">
                      {categories.find((c) => c.id === activeTab)?.label.split(" ")[0]}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-stone-400">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-[#1A1A2E] font-bold mb-1 group-hover:text-[#6C3CE1] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Video count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-stone-400 text-sm font-[family-name:var(--font-sub)]"
        >
          Showing{" "}
          <span className="font-[family-name:var(--font-mono)] text-[#6C3CE1] font-semibold">
            {String(currentVideos.length).padStart(2, "0")}
          </span>{" "}
          videos in{" "}
          <span className="text-[#1A1A2E] font-medium">
            {categories.find((c) => c.id === activeTab)?.label}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
