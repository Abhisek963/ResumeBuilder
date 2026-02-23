import React from "react";
import { Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#874ff8] to-[#e5e7eb] text-black text-sm py-2.5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-tighter bg-indigo-500 text-black px-2 py-0.5 rounded-md font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">
          <Sparkles size={10} />
          New
        </span>
        <p className="text-black text-xs md:text-sm font-medium">
          AI Resume Builder is now live — generate optimized resumes in minutes.
        </p>
      </div>
    </div>
  );
};

export default Banner;