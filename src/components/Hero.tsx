"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <div className="z-10 text-center px-4 w-full max-w-7xl mx-auto mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-[13vw] leading-[0.8] font-heading font-bold tracking-tighter uppercase mb-4">
            FULL<br />STACK<br />ENGINEER
          </h1>
          <div className="flex justify-between items-center w-full px-2 md:px-4 mt-12">
            <p className="text-sm md:text-xl font-mono uppercase tracking-widest text-left">
              HARSH SRIVASTAVA
            </p>
            <p className="text-sm md:text-xl font-mono uppercase tracking-widest text-right">
              BASED IN KANPUR, IN
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL</span>
        <div className="w-[1px] h-12 bg-white"></div>
      </motion.div>
    </section>
  );
}
