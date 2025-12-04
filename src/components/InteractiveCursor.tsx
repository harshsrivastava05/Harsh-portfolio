"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function ParticleSwarm({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const count = 150; // Revert count
  const ref = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  // Initial positions and velocities
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2; // Revert spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = 0;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }
    return [positions, velocities];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;

    const positionsAttribute = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let px = positionsAttribute.getX(i);
      let py = positionsAttribute.getY(i);
      let pz = positionsAttribute.getZ(i);

      // Revert physics
      const friction = 0.90; 
      const ease = 0.05; 
      const spread = 0.5;

      const dx = targetX - px + (Math.random() - 0.5) * spread;
      const dy = targetY - py + (Math.random() - 0.5) * spread;
      
      velocities[ix] += dx * ease * delta * 60;
      velocities[iy] += dy * ease * delta * 60;
      
      velocities[ix] *= friction;
      velocities[iy] *= friction;

      px += velocities[ix] * delta * 60;
      py += velocities[iy] * delta * 60;

      positionsAttribute.setXYZ(i, px, py, pz);
    }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.15} // Revert size
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function InteractiveCursor() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom DOM Cursor - Stylized Arrow */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        animate={{
          x: cursorPos.x,
          y: cursorPos.y,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        style={{ 
          pointerEvents: "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="1.5"/>
        </svg>
      </motion.div>

      {/* 3D Particle Layer */}
      <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference" style={{ pointerEvents: "none" }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ pointerEvents: "none" }}
        >
          <ParticleSwarm mouse={mouse} />
        </Canvas>
      </div>
    </>
  );
}
