"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "@/data/portfolio-info.json";
import { useEffect, useState } from "react";

// Image mappings (duplicated for now, ideally shared)
const projectImages: Record<number, string[]> = {
  1: [ // Curiobot
    "/assets/project-images/curiobot/Homepage.png",
    "/assets/project-images/curiobot/Dashboard.png",
    "/assets/project-images/curiobot/Mindtree.png",
    "/assets/project-images/curiobot/AI_Q&A.png"
  ],
  2: [ // DocAnalyzer
    "/assets/project-images/docanalyzer/Homepage.png",
    "/assets/project-images/docanalyzer/Dashboard.png",
    "/assets/project-images/docanalyzer/AI_Q&A_PAGE.png"
  ],
  3: [ // Ashmark
    "/assets/project-images/ashmark/homepage.png",
    "/assets/project-images/ashmark/AdminDashboard.png",
    "/assets/project-images/ashmark/checkout_page.png"
  ],
  7: [ // Synapsis
    "/assets/project-images/synapsis/Homepage.png",
    "/assets/project-images/synapsis/ProjecrDisplay_page.png",
    "/assets/project-images/synapsis/AboutUs_section.png"
  ],
  // Fallbacks/Single images
  4: ["/assets/project-images/twitter.png"],
  5: ["/assets/project-images/chatting.png"],
  6: ["/assets/project-images/foodie.png"],
};

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const foundProject = portfolioData.projects.find(
        (p) => p.id === Number(params.id)
      );
      setProject(foundProject);
    }
  }, [params.id]);

  // Auto-advance carousel
  useEffect(() => {
    if (!project) return;
    const images = projectImages[project.id] || [];
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-mono text-xl animate-pulse">LOADING PROJECT DATA...</p>
      </div>
    );
  }

  const images = projectImages[project.id] || ["/assets/images/myself.jpeg"];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="text-sm uppercase tracking-widest hover:underline">
          ← Back to Index
        </Link>
        <span className="text-sm uppercase tracking-widest">
          {project.type}
        </span>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <span className="text-gray-500 block mb-4 tracking-widest">
            {String(project.id).padStart(2, "0")} / PROJECT
          </span>
          <h1 className="text-[8vw] leading-[0.8] font-bold tracking-tighter uppercase mb-12 font-heading">
            {project.name}
          </h1>
        </motion.div>

        {/* Main Image Carousel */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-full aspect-video border border-white/20 overflow-hidden mb-24 bg-zinc-900"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={project.name}
                fill
                className="object-contain" // Fit image without cropping
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Carousel Controls/Indicators */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === currentImageIndex ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-8">
            <h3 className="text-sm text-gray-500 uppercase mb-8 tracking-widest">
              Description
            </h3>
            <p className="text-2xl md:text-3xl font-light leading-tight uppercase tracking-wide">
              {project.description}
            </p>

            <div className="mt-16 flex gap-8">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest"
                >
                  Visit Live Site ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest"
                >
                  View Source ↗
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-4 space-y-12">
            <div>
              <h3 className="text-sm text-gray-500 uppercase mb-4 tracking-widest">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 border border-white/20 text-xs uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.features && (
              <div>
                <h3 className="text-sm text-gray-500 uppercase mb-4 tracking-widest">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature: string, i: number) => (
                    <li key={i} className="text-sm text-gray-400 border-b border-white/10 pb-2 uppercase tracking-wide">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
