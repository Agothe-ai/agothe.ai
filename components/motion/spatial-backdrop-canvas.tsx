"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshReflectorMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

type Props = {
  scrollYProgress: MotionValue<number>;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function intensityCurve(p: number) {
  const x = clamp01(p);

  const whisper = 0.25;
  const breathT = smoothstep(0.35, 0.80, x);
  const breath = THREE.MathUtils.lerp(whisper, 0.65, breathT);

  const pulseUp = smoothstep(0.80, 0.92, x);
  const pulseDown = smoothstep(0.92, 1.00, x);

  const peak = THREE.MathUtils.lerp(breath, 1.0, pulseUp);
  const settled = THREE.MathUtils.lerp(peak, 0.75, pulseDown);

  return settled;
}

function usePointer() {
  const ref = useRef({ x: 0, y: 0 });
  return {
    set(x: number, y: number) {
      ref.current.x = x;
      ref.current.y = y;
    },
    get() {
      return ref.current;
    },
  };
}

function CorridorScene({ scrollYProgress }: Props) {
  const rig = useRef<THREE.Group>(null);
  const corridor = useRef<THREE.Group>(null);
  const pointer = usePointer();

  const dims = useMemo(
    () => ({
      width: 9.5,
      height: 6.0,
      length: 14.0,
      segments: 6,
    }),
    []
  );

  const chromeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#cbd5e1"),
        metalness: 0.92,
        roughness: 0.22,
        clearcoat: 0.65,
        clearcoatRoughness: 0.28,
        transmission: 0.04,
        thickness: 0.6,
        ior: 1.35,
        emissive: new THREE.Color("#001014"),
        emissiveIntensity: 0.35,
      }),
    []
  );

  const ribMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#94a3b8"),
        metalness: 0.88,
        roughness: 0.28,
        clearcoat: 0.55,
        clearcoatRoughness: 0.32,
        emissive: new THREE.Color("#001014"),
        emissiveIntensity: 0.22,
      }),
    []
  );

  const ribbonMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0a0a0a"),
      metalness: 0.35,
      roughness: 0.25,
      emissive: new THREE.Color("#00f0ff"),
      emissiveIntensity: 0.0,
    });
  }, []);

  const wallGeo = useMemo(
    () => new THREE.PlaneGeometry(dims.length, dims.height, 1, 1),
    [dims.length, dims.height]
  );

  const ribGeo = useMemo(() => new THREE.TorusGeometry(2.6, 0.06, 12, 90), []);

  const ribbonGeo = useMemo(
    () => new THREE.PlaneGeometry(dims.length, 0.16, 1, 1),
    [dims.length]
  );

  const segmentZ = useMemo(() => {
    const z: number[] = [];
    for (let i = 0; i < dims.segments; i++) z.push(-i * (dims.length * 0.9));
    return z;
  }, [dims.length, dims.segments]);

  const acc = useRef(0);

  useFrame(({ clock, camera }, delta) => {
    acc.current += delta;
    if (acc.current < 1 / 30) return;
    acc.current = 0;

    const t = clock.getElapsedTime();
    const p = clamp01(scrollYProgress.get());
    const intensity = intensityCurve(p);

    const forward = THREE.MathUtils.lerp(0, dims.length * 1.8, p);

    const pt = pointer.get();
    const px = pt.x;
    const py = pt.y;

    if (rig.current) {
      const targetX = px * 0.18 * intensity;
      const targetY = py * 0.10 * intensity;

      rig.current.position.x = THREE.MathUtils.lerp(rig.current.position.x, targetX, 0.06);
      rig.current.position.y = THREE.MathUtils.lerp(rig.current.position.y, targetY, 0.06);

      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, px * 0.10 * intensity, 0.05);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -py * 0.06 * intensity, 0.05);
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.5 - forward, 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(t * 0.12) * 0.10, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.35 + Math.sin(t * 0.15) * 0.06, 0.04);
    camera.lookAt(0, 0, camera.position.z - 10);

    const ribbonBoost = smoothstep(0.35, 0.80, p) * 0.85 + smoothstep(0.80, 0.92, p) * 0.65;
    ribbonMat.emissiveIntensity = THREE.MathUtils.lerp(
      ribbonMat.emissiveIntensity,
      0.05 + ribbonBoost * 2.2 * intensity,
      0.08
    );

    const structured = smoothstep(0.70, 1.0, p);
    chromeMat.roughness = THREE.MathUtils.lerp(0.26, 0.18, structured);
    chromeMat.clearcoat = THREE.MathUtils.lerp(0.55, 0.72, structured);

    if (corridor.current) {
      const children = corridor.current.children;
      for (let i = 0; i < children.length; i++) {
        const g = children[i] as THREE.Group;

        const camZ = camera.position.z;
        const segZ = g.position.z;

        const behindThreshold = camZ + 6;
        const aheadThreshold = camZ - dims.length * dims.segments * 0.9;

        if (segZ > behindThreshold) g.position.z = aheadThreshold;

        g.rotation.z = Math.sin(t * 0.08 + i) * 0.01 * intensity;
      }
    }
  });

  return (
    <group
      ref={rig}
      onPointerMove={(e) => {
        const x = (e.pointer.x / (window.innerWidth || 1)) * 2 - 1;
        const y = (e.pointer.y / (window.innerHeight || 1)) * 2 - 1;
        pointer.set(x, -y);
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 3, 2]} intensity={1.05} color={"#00f0ff"} />
      <directionalLight position={[-3, -2, 4]} intensity={0.85} color={"#ffd700"} />
      <directionalLight position={[0, 2, 6]} intensity={0.45} color={"#ffffff"} />

      <Environment preset="city" />

      <group ref={corridor}>
        {segmentZ.map((z, idx) => (
          <group key={`seg-${idx}`} position={[0, 0, z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]}>
              <planeGeometry args={[dims.width, dims.length]} />
              <MeshReflectorMaterial
                blur={[300, 60]}
                resolution={768}
                mixBlur={0.55}
                mixStrength={1.15}
                roughness={0.16}
                depthScale={0.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.2}
                color="#050507"
                metalness={0.6}
                mirror={1}
              />
            </mesh>

            <mesh
              geometry={wallGeo}
              material={chromeMat}
              rotation={[0, Math.PI / 2, 0]}
              position={[-dims.width / 2, 0.35, -dims.length / 2]}
            />
            <mesh
              geometry={wallGeo}
              material={chromeMat}
              rotation={[0, -Math.PI / 2, 0]}
              position={[dims.width / 2, 0.35, -dims.length / 2]}
            />

            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -dims.length / 2]}>
              <planeGeometry args={[dims.width, dims.length]} />
              <meshStandardMaterial
                color="#0a0a0a"
                metalness={0.2}
                roughness={0.8}
                transparent
                opacity={0.25}
              />
            </mesh>

            <Float speed={0.25} floatIntensity={0.08} rotationIntensity={0.12}>
              <mesh
                geometry={ribGeo}
                material={ribMat}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0.55, -dims.length * 0.55]}
                scale={[1.15, 1.15, 1.15]}
              />
            </Float>

            <mesh
              geometry={ribbonGeo}
              material={ribbonMat}
              rotation={[0, Math.PI / 2, 0]}
              position={[-dims.width / 2 + 0.02, 0.35, -dims.length * 0.48]}
            />
            <mesh
              geometry={ribbonGeo}
              material={ribbonMat}
              rotation={[0, -Math.PI / 2, 0]}
              position={[dims.width / 2 - 0.02, 0.35, -dims.length * 0.52]}
            />
          </group>
        ))}
      </group>

      <fog attach="fog" args={["#0a0a0a", 7.5, 26]} />
    </group>
  );
}

export default function SpatialBackdropCanvas({ scrollYProgress }: Props) {
  const capability = useDeviceCapability();
  const dpr: number | [number, number] = capability === "high" ? [1, 1.5] : [1, 1.25];

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.35, 8.5], fov: 45, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CorridorScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
