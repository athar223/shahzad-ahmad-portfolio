"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WaveLines from "./WaveLines";
import type { ClientReview } from "@/lib/api";

const fallbackReviews: ClientReview[] = [
  { id: 1, client_name: "Ali Khan", review_text: "Shahzad delivered an incredible video edit that exceeded all expectations. Professional, creative, and on time!", client_image: "", rating: 5 },
  { id: 2, client_name: "Sarah Ahmed", review_text: "Amazing graphic design work. Our brand identity looks premium and modern. Highly recommended!", client_image: "", rating: 5 },
  { id: 3, client_name: "Omar Malik", review_text: "Outstanding social media content. Our engagement increased by 200% after working with Shahzad.", client_image: "", rating: 4 },
];

function StarRating({ rating, delay }: { rating: number; delay: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + star * 0.06, type: "spring", stiffness: 300 }}
          className={`w-4 h-4 ${star <= rating ? "text-[#F59E0B]" : "text-stone-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

interface ReviewsProps {
  reviews?: ClientReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const data = reviews?.length ? reviews : fallbackReviews;

  return (
    <section id="reviews" className="relative py-28 bg-white overflow-hidden">
      <WaveLines variant="top" color="#F59E0B" opacity={0.03} />
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
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Client <span className="text-[#6C3CE1]">Reviews</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="group bg-white border border-stone-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <svg className="w-10 h-10 text-[#6C3CE1]/15 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>

              <p className="text-stone-600 leading-relaxed mb-6 flex-1 italic">
                &ldquo;{review.review_text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#EDE9FE]">
                  {review.client_image ? (
                    <Image src={review.client_image} alt={review.client_name} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EDE9FE] text-[#6C3CE1] font-bold text-lg font-[family-name:var(--font-heading)]">
                      {review.client_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-[#1A1A2E] font-semibold text-sm">{review.client_name}</p>
                  <StarRating rating={review.rating} delay={0.4 + index * 0.1} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
