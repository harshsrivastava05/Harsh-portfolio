"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function PlanetParticles(props: any) {
  const ref = useRef<THREE.Points>(null!);
  
  const spherePoints = useMemo(() => {
    const count = 5000;
    const radius = 1.2;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      // Better sphere distribution
      const x = THREE.MathUtils.randFloatSpread(2);
      const y = THREE.MathUtils.randFloatSpread(2);
      const z = THREE.MathUtils.randFloatSpread(2);
      
      // Normalize to radius
      const mag = Math.sqrt(x*x + y*y + z*z);
      points[i*3] = (x / mag) * radius;
      points[i*3+1] = (y / mag) * radius;
      points[i*3+2] = (z / mag) * radius;
    }
    return points;
  }, []);

  const { viewport } = useThree();
  // Adjust scale based on viewport width (mobile check)
  // Base radius is 1.2 (diameter 2.4). If viewport width is smaller, scale down.
  const scale = viewport.width < 3.5 ? viewport.width / 3.5 : 1;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} scale={[scale, scale, scale]}>
      <Points ref={ref} positions={spherePoints} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="w-full h-full absolute inset-0">
             <Canvas camera={{ position: [0, 0, 2.5] }}>
                <PlanetParticles />
             </Canvas>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white text-6xl md:text-8xl font-bold z-10 tracking-tighter mix-blend-difference font-heading"
          >
            LOADING
          </motion.h1>
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "200px" }}
             transition={{ duration: 2, ease: "easeInOut" }}
             className="h-[2px] bg-white mt-4 z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
