"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import portfolioData from "@/data/portfolio-info.json";

// Image mappings
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
  4: [ // Synapsis
    "/assets/project-images/synapsis/Homepage.png",
    "/assets/project-images/synapsis/ProjecrDisplay_page.png",
    "/assets/project-images/synapsis/AboutUs_section.png"
  ],
  // Fallbacks/Single images
  5: ["/assets/project-images/twitter.png"],
  6: ["/assets/project-images/chatting.png"],
  7: ["/assets/project-images/foodie.png"],
};

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="py-32 px-4 md:px-8 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white pb-8">
          <h2 className="text-[10vw] leading-[0.8] font-heading font-bold tracking-tighter uppercase">
            Selected<br />Works
          </h2>
          <span className="text-xl font-mono text-gray-500 mt-4 md:mt-0 uppercase tracking-widest">(2023 — 2025)</span>
        </div>
        
        <div className="flex flex-col gap-px bg-white border border-white">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  
  const images = projectImages[project.id] || ["/assets/images/myself.jpeg"];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Carousel effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hovered && !isMobile && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800); 
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, isMobile, images.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Link
        href={`/projects/${project.id}`}
        ref={ref}
        className="group relative p-8 md:p-12 transition-colors duration-500 block border-b border-white last:border-b-0 z-10"
        style={{
          backgroundColor: (hovered && !isMobile) ? "#ffffff" : "#000000",
          color: (hovered && !isMobile) ? "#000000" : "#ffffff"
        }}
        onMouseEnter={(e) => {
          if (isMobile) return;
          setMousePos({ x: e.clientX, y: e.clientY });
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-start gap-8 w-full md:w-auto">
            <span className={`font-mono text-xl pt-1 transition-colors ${
              (hovered && !isMobile) ? "text-black" : "text-gray-500"
            }`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={`text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase transition-transform duration-500 ${
              (hovered && !isMobile) ? "translate-x-4" : ""
            }`}>
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-4 md:gap-12 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden md:flex gap-2">
              {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                <span key={i} className="text-xs font-mono border-[1.5px] border-current px-3 py-1 uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
            <div className={`w-12 h-12 flex items-center justify-center border-[1.5px] border-current rounded-full transition-all duration-500 ${
              (hovered && !isMobile) ? "bg-black text-white" : ""
            }`}>
              <span className={`text-2xl font-heading transition-transform duration-500 ${
                (hovered && !isMobile) ? "rotate-0" : "-rotate-45"
              }`}>
                →
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Portal-like Hover Image (Desktop Only) */}
      <AnimatePresence>
        {hovered && !isMobile && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: mousePos.x + 20, 
              y: mousePos.y - 100 
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: mousePos.x + 20,
              y: mousePos.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="fixed z-[100] pointer-events-none w-[400px] h-[225px] bg-black border-2 border-white overflow-hidden shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]"
            style={{ left: 0, top: 0 }} 
          >
            {/* Image Carousel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Brutalist Overlay Info */}
            <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-mono text-white uppercase tracking-widest bg-black px-1 border border-white">
                IMG {String(currentImageIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                VIEW PROJECT
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
