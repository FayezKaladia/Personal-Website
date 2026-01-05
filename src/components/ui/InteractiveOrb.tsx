import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrbMeshProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const OrbMesh: React.FC<OrbMeshProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Target position for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth interpolation towards mouse position
    const targetX = mousePosition.current.y * 0.3;
    const targetY = mousePosition.current.x * 0.3;
    
    targetRotation.current.x += (targetX - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (targetY - targetRotation.current.y) * 0.05;

    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;

    // Inner orb counter-rotation for depth effect
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -targetRotation.current.x * 0.5 + state.clock.elapsedTime * 0.2;
      innerMeshRef.current.rotation.y = -targetRotation.current.y * 0.5 + state.clock.elapsedTime * 0.15;
    }

    // Subtle pulsing glow
    if (glowRef.current) {
      const scale = 1.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const primaryColor = useMemo(() => new THREE.Color('#00d4ff'), []);
  const secondaryColor = useMemo(() => new THREE.Color('#8b5cf6'), []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Outer glow sphere */}
        <Sphere ref={glowRef} args={[1.3, 32, 32]}>
          <meshBasicMaterial
            color={primaryColor}
            transparent
            opacity={0.05}
          />
        </Sphere>

        {/* Main orb with distortion */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={primaryColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Inner orb for depth */}
        <Sphere ref={innerMeshRef} args={[0.6, 32, 32]}>
          <MeshDistortMaterial
            color={secondaryColor}
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Core glow */}
        <Sphere args={[0.25, 16, 16]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </Sphere>

        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <OrbitingParticle key={i} index={i} />
        ))}
      </group>
    </Float>
  );
};

const OrbitingParticle: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = (index / 3) * Math.PI * 2;
  const radius = 1.5 + index * 0.15;
  const speed = 0.5 + index * 0.1;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.3;
  });

  return (
    <Sphere ref={ref} args={[0.05, 8, 8]}>
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
    </Sphere>
  );
};

const InteractiveOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalize mouse position to -1 to 1
    mousePosition.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  };

  const handleMouseLeave = () => {
    // Smoothly return to center
    mousePosition.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          color="#ffffff"
        />
        <Suspense fallback={null}>
          <OrbMesh mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveOrb;
