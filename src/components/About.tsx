"use client";

import portfolioData from "@/data/portfolio-info.json";
import { motion } from "framer-motion";

export default function About() {
  const { about, skills, education } = portfolioData;

  return (
    <section className="py-32 px-4 md:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-24 gap-y-16">
          {/* Header */}
          <div className="md:col-span-5">
            <h2 className="text-[8vw] leading-[0.8] font-heading font-bold tracking-tighter uppercase sticky top-32 mix-blend-difference z-20">
              About
            </h2>
          </div>

          {/* Content */}
          <div className="md:col-span-7 space-y-24">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl md:text-4xl font-light leading-[1.5] uppercase tracking-wide">
                <span className="bg-white text-black px-2 py-1 box-decoration-clone">
                  {about.summary.split(",")[0]},
                </span>
                <span className="px-2">
                  {about.summary.split(",").slice(1).join(",")}
                </span>
              </p>
            </motion.div>

            {/* Education */}
            <div className="border-t border-white pt-12">
              <h3 className="text-sm font-mono mb-8 tracking-widest text-gray-500 uppercase">Education</h3>
              <div className="flex flex-col gap-4">
                <span className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight">{education.college.name}</span>
                <span className="text-xl font-mono text-gray-400 uppercase">{education.college.degree} — {education.college.field}</span>
                <span className="text-sm font-mono mt-2 text-gray-600 uppercase">{education.currentStatus} • {education.college.location}</span>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-800 pt-12">
              {/* Frontend */}
              <div>
                <h3 className="text-xs font-mono mb-8 tracking-widest text-gray-500 uppercase">Frontend</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.frontend.map((skill, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <h3 className="text-xs font-mono mb-8 tracking-widest text-gray-500 uppercase">Backend</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.backend.map((skill, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div>
                <h3 className="text-xs font-mono mb-8 tracking-widest text-gray-500 uppercase">Databases</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.databases.map((skill, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-xs font-mono mb-8 tracking-widest text-gray-500 uppercase">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.tools.map((skill, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="md:col-span-2">
                <h3 className="text-xs font-mono mb-8 tracking-widest text-gray-500 uppercase">Specializations</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.specializations.map((skill, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
