"use client";

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF8] border-t border-stone-100 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-stone-400 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-[family-name:var(--font-heading)] font-bold text-[#6C3CE1]">Shahzad Ahmad</span>
          . All rights reserved.
        </p>
        <a
          href="#home"
          className="text-sm text-stone-400 hover:text-[#6C3CE1] transition-colors"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
