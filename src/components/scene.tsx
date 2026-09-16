"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// postprocessing removed — glow is per-particle
import { useTheme } from "next-themes";
import * as THREE from "three";
import { sampleBrainFromImage } from "@/components/brain-geometry";

/* ─── Sharp circle texture (no gradient halo) ─── */
function useCircleTexture() {
  return useMemo(() => {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}


/* ─── Generate synaptic connections between nearby neurons ─── */
function generateConnections(
  positions: Float32Array,
  count: number,
  maxDist: number
): { starts: Float32Array; ends: Float32Array; count: number } {
  const starts: number[] = [];
  const ends: number[] = [];

  for (let i = 0; i < count; i++) {
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];

    let connections = 0;
    for (let j = i + 1; j < count && connections < 3; j++) {
      const jx = positions[j * 3];
      const jy = positions[j * 3 + 1];
      const jz = positions[j * 3 + 2];

      const dx = ix - jx;
      const dy = iy - jy;
      const dz = iz - jz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDist && Math.random() < 0.3) {
        starts.push(ix, iy, iz);
        ends.push(jx, jy, jz);
        connections++;
      }
    }
  }

  const linePositions = new Float32Array(starts.length + ends.length);
  for (let i = 0; i < starts.length / 3; i++) {
    linePositions[i * 6] = starts[i * 3];
    linePositions[i * 6 + 1] = starts[i * 3 + 1];
    linePositions[i * 6 + 2] = starts[i * 3 + 2];
    linePositions[i * 6 + 3] = ends[i * 3];
    linePositions[i * 6 + 4] = ends[i * 3 + 1];
    linePositions[i * 6 + 5] = ends[i * 3 + 2];
  }

  return {
    starts: new Float32Array(starts),
    ends: new Float32Array(ends),
    count: starts.length / 3,
  };
}

/* ─── Neurons (dots) — with subtle twinkling ─── */
function Neurons({ positions, count }: { positions: Float32Array; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const dotTex = useCircleTexture();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseColors = useMemo(() => {
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      if (isDark) {
        c[i * 3] = 0.35 + Math.random() * 0.15;
        c[i * 3 + 1] = 0.35 + Math.random() * 0.15;
        c[i * 3 + 2] = 0.45 + Math.random() * 0.15;
      } else {
        c[i * 3] = 0.45 + Math.random() * 0.15;
        c[i * 3 + 1] = 0.5 + Math.random() * 0.15;
        c[i * 3 + 2] = 0.65 + Math.random() * 0.1;
      }
    }
    return c;
  }, [count, isDark]);

  const phases = useMemo(() => {
    return Array.from({ length: count }, () => Math.random() * Math.PI * 2);
  }, [count]);

  const twinkleSpeeds = useMemo(() => {
    return Array.from({ length: count }, () => 0.3 + Math.random() * 1.5);
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const colAttr = ref.current.geometry.getAttribute("color") as THREE.BufferAttribute;

    // Only twinkle a subset each frame for performance
    const step = 8;
    const offset = Math.floor(t * 60) % step;
    for (let i = offset; i < count; i += step) {
      const twinkle = 0.7 + Math.sin(t * twinkleSpeeds[i] + phases[i]) * 0.3;
      colAttr.setXYZ(
        i,
        baseColors[i * 3] * twinkle,
        baseColors[i * 3 + 1] * twinkle,
        baseColors[i * 3 + 2] * twinkle
      );
    }
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[baseColors.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={dotTex}
        size={0.012}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Synaptic connections (lines) ─── */
function Synapses({
  starts,
  ends,
  connectionCount,
}: {
  starts: Float32Array;
  ends: Float32Array;
  connectionCount: number;
}) {
  const ref = useRef<THREE.LineSegments>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const linePositions = useMemo(() => {
    const p = new Float32Array(connectionCount * 6);
    for (let i = 0; i < connectionCount; i++) {
      p[i * 6] = starts[i * 3];
      p[i * 6 + 1] = starts[i * 3 + 1];
      p[i * 6 + 2] = starts[i * 3 + 2];
      p[i * 6 + 3] = ends[i * 3];
      p[i * 6 + 4] = ends[i * 3 + 1];
      p[i * 6 + 5] = ends[i * 3 + 2];
    }
    return p;
  }, [starts, ends, connectionCount]);

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={isDark ? "#1a2a4a" : "#8898b8"}
        transparent
        opacity={0.12}
      />
    </lineSegments>
  );
}

/* ─── Electric pulses traveling along synapses ─── */
function Pulses({
  starts,
  ends,
  connectionCount,
}: /* pulse props */ {
  starts: Float32Array;
  ends: Float32Array;
  connectionCount: number;
}) {
  const pulseCount = Math.min(connectionCount, 400);
  const ref = useRef<THREE.Points>(null);
  const dotTex = useCircleTexture();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pulseIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < pulseCount; i++) {
      indices.push(Math.floor(Math.random() * connectionCount));
    }
    return indices;
  }, [pulseCount, connectionCount]);

  const speeds = useMemo(() => {
    return pulseIndices.map(() => 0.05 + Math.random() * 0.4);
  }, [pulseIndices]);

  const offsets = useMemo(() => {
    return pulseIndices.map(() => Math.random());
  }, [pulseIndices]);

  const positions = useMemo(() => new Float32Array(pulseCount * 3), [pulseCount]);
  const colors = useMemo(() => {
    const c = new Float32Array(pulseCount * 3);
    for (let i = 0; i < pulseCount; i++) {
      if (isDark) {
        const type = Math.random();
        if (type < 0.4) {
          c[i * 3] = 0.3;
          c[i * 3 + 1] = 0.5;
          c[i * 3 + 2] = 1.0; // blue
        } else if (type < 0.7) {
          c[i * 3] = 0.7;
          c[i * 3 + 1] = 0.3;
          c[i * 3 + 2] = 0.9; // purple
        } else {
          c[i * 3] = 0.2;
          c[i * 3 + 1] = 0.8;
          c[i * 3 + 2] = 0.9; // cyan
        }
      } else {
        const type = Math.random();
        if (type < 0.4) {
          c[i * 3] = 0.15;
          c[i * 3 + 1] = 0.3;
          c[i * 3 + 2] = 0.75;
        } else if (type < 0.7) {
          c[i * 3] = 0.45;
          c[i * 3 + 1] = 0.2;
          c[i * 3 + 2] = 0.7;
        } else {
          c[i * 3] = 0.1;
          c[i * 3 + 1] = 0.5;
          c[i * 3 + 2] = 0.65;
        }
      }
    }
    return c;
  }, [pulseCount, isDark]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < pulseCount; i++) {
      const idx = pulseIndices[i];
      const raw = (t * speeds[i] + offsets[i]) % 2;
      const pingPong = raw < 1 ? raw : 2 - raw;
      const progress = pingPong * pingPong * (3 - 2 * pingPong);

      pos.setXYZ(
        i,
        starts[idx * 3] + (ends[idx * 3] - starts[idx * 3]) * progress,
        starts[idx * 3 + 1] + (ends[idx * 3 + 1] - starts[idx * 3 + 1]) * progress,
        starts[idx * 3 + 2] + (ends[idx * 3 + 2] - starts[idx * 3 + 2]) * progress
      );
    }

    pos.needsUpdate = true;
  });

  return (
    <>
      {/* Pulse core — small bright dot */}
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          map={dotTex}
          size={0.06}
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

/* ─── Active regions — larger glowing spots that pulse ─── */
function ActiveRegions({
  starts,
  ends,
  connectionCount,
}: {
  starts: Float32Array;
  ends: Float32Array;
  connectionCount: number;
}) {
  const extraPulseCount = Math.min(connectionCount, 300);
  const ref = useRef<THREE.Points>(null);
  const dotTex = useCircleTexture();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pulseIndices = useMemo(() => {
    return Array.from({ length: extraPulseCount }, () =>
      Math.floor(Math.random() * connectionCount)
    );
  }, [extraPulseCount, connectionCount]);

  const speeds = useMemo(() => {
    return pulseIndices.map(() => 0.04 + Math.random() * 0.35);
  }, [pulseIndices]);

  const offsets = useMemo(() => {
    return pulseIndices.map(() => Math.random());
  }, [pulseIndices]);

  const positions = useMemo(() => new Float32Array(extraPulseCount * 3), [extraPulseCount]);
  const colors = useMemo(() => {
    const c = new Float32Array(extraPulseCount * 3);
    for (let i = 0; i < extraPulseCount; i++) {
      if (isDark) {
        c[i * 3] = 0.25;
        c[i * 3 + 1] = 0.6;
        c[i * 3 + 2] = 0.85;
      } else {
        c[i * 3] = 0.2;
        c[i * 3 + 1] = 0.4;
        c[i * 3 + 2] = 0.7;
      }
    }
    return c;
  }, [extraPulseCount, isDark]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < extraPulseCount; i++) {
      const idx = pulseIndices[i];
      const raw = (t * speeds[i] + offsets[i]) % 2;
      const pingPong = raw < 1 ? raw : 2 - raw;
      const progress = pingPong * pingPong * (3 - 2 * pingPong);

      pos.setXYZ(
        i,
        starts[idx * 3] + (ends[idx * 3] - starts[idx * 3]) * progress,
        starts[idx * 3 + 1] + (ends[idx * 3 + 1] - starts[idx * 3 + 1]) * progress,
        starts[idx * 3 + 2] + (ends[idx * 3 + 2] - starts[idx * 3 + 2]) * progress
      );
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={dotTex}
        size={0.045}
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Brain group ─── */
function BrainGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const neuronCount = 40000;
  const [positions, setPositions] = useState<Float32Array>(
    () => new Float32Array(neuronCount * 3)
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/brain.jpg";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pts = sampleBrainFromImage(imageData, neuronCount);
      setPositions(pts);
      setLoaded(true);
    };
  }, []);

  const connections = useMemo(
    () => (loaded ? generateConnections(positions, neuronCount, 0.12) : null),
    [positions, loaded]
  );

  // Brain stays still — classic side view

  if (!loaded || !connections) return null;

  return (
    <group ref={groupRef}>
      <Neurons positions={positions} count={neuronCount} />
      <Synapses
        starts={connections.starts}
        ends={connections.ends}
        connectionCount={connections.count}
      />
      <Pulses
        starts={connections.starts}
        ends={connections.ends}
        connectionCount={connections.count}
      />
      <ActiveRegions
        starts={connections.starts}
        ends={connections.ends}
        connectionCount={connections.count}
      />
    </group>
  );
}

/* ─── Fade in the entire scene ─── */
function SceneFadeIn({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef(0);
  const done = useRef(false);
  const materialsCache = useRef<{ mat: THREE.Material & { opacity: number }; base: number }[]>([]);

  useFrame(({ clock }) => {
    if (done.current || !groupRef.current) return;
    if (startTime.current === 0) startTime.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startTime.current;
    const opacity = Math.min(1, elapsed / 2.5);

    // Build cache once
    if (materialsCache.current.length === 0) {
      groupRef.current.traverse((obj) => {
        const mat = (obj as THREE.Mesh | THREE.Points | THREE.LineSegments).material;
        if (mat && "opacity" in mat) {
          const m = mat as THREE.Material & { opacity: number };
          materialsCache.current.push({ mat: m, base: m.opacity });
        }
      });
    }

    for (const { mat, base } of materialsCache.current) {
      mat.opacity = base * opacity;
    }

    if (opacity >= 1) done.current = true;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─── Camera ─── */
function Rig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scrollZ = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      scrollZ.current = progress * 3;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(({ pointer }) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 0.5, 0.015);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 0.3, 0.015);
    camera.position.x = mouse.current.x;
    camera.position.y = mouse.current.y + 0.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4 + scrollZ.current, 0.08);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.2, 4], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.NoToneMapping,
        }}
        style={{ pointerEvents: "auto" }}
      >
        <SceneFadeIn>
          <BrainGroup />
        </SceneFadeIn>
        <Rig />

{/* No bloom — glow is done per-particle */}
      </Canvas>
    </div>
  );
}
