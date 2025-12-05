"use client";

import portfolioData from "@/data/portfolio-info.json";
import { motion } from "framer-motion";

export default function Contact() {
  const { personalInfo } = portfolioData;

  return (
    <section className="py-32 px-4 md:px-8 bg-black text-white min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <h2 className="text-[12vw] leading-[0.8] font-heading font-bold tracking-tighter mb-16 uppercase mix-blend-difference">
            Let's<br />Talk
          </h2>
          
          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-lg sm:text-2xl md:text-4xl font-mono border-b border-white pb-2 hover:bg-white hover:text-black transition-all uppercase break-all"
          >
            {personalInfo.email}
          </a>
        </motion.div>
      </div>

      <div className="w-full px-4 md:px-8 border-t border-white pt-8 pb-8 text-sm font-mono text-gray-500 flex flex-col md:flex-row justify-between items-end uppercase">
        <div className="flex gap-8">
          <a href="https://github.com/harshsrivastava05" target="_blank" className="hover:text-white transition-colors">GITHUB</a>
          <a href="https://www.linkedin.com/in/harsh-srivastava-a4ab8a273/" target="_blank" className="hover:text-white transition-colors">LINKEDIN</a>
          <a href="https://leetcode.com/u/harshsrivastava05/" target="_blank" className="hover:text-white transition-colors">LEETCODE</a>
          <a href="https://drive.google.com/file/d/1GH64rHcgNSsq6V7E2EQ453WpuQcdfUNy/view?usp=sharing" target="_blank" className="hover:text-white transition-colors">RESUME</a>
        </div>
        <span className="mt-4 md:mt-0">© 2025 HARSH SRIVASTAVA</span>
      </div>
    </section>
  );
}
