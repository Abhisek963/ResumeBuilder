import React from "react";
import { Zap, Sparkles, ShieldCheck, Layout } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Optimization",
      desc: "Enhance summaries and job descriptions instantly using intelligent suggestions tailored for ATS systems.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      desc: "Your data is encrypted and securely stored. Only you control visibility and sharing.",
    },
    {
      icon: Layout,
      title: "Premium Templates",
      desc: "Choose from professionally designed resume layouts built for corporate, tech, and executive roles.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-28 px-6 bg-gray-200 text-slate-900 min-h-screen"
    >
      <div className="max-w-6xl mx-auto text-center ">

        {/* Label */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-900 border bg-gradient-to-b from-[#874ff8] to-[#380B60] px-4 py-1 rounded-full mb-6">
          <Zap size={14} />
          <span>How It Works</span>
        </div>

        {/* Title */}
        <Title
          title="Build a Professional Resume in Minutes"
          description="A streamlined process designed to help you craft, optimize, and export job-ready resumes effortlessly."
        />

        {/* Feature Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-10">

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-zinc-200 rounded-2xl p-10 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 mb-6 group-hover:bg-black transition-colors">
                  <Icon
                    size={20}
                    className="text-zinc-700 group-hover:text-white transition-colors"
                  />
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;