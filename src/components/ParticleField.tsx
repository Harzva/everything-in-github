import { useRef, useMemo, useEffect, useState, lazy, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  originalPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  displacement: THREE.Vector3;
  phase: number;
}

function ParticlesCore({ count, mouse }: { count: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useFrame((state) => {
    return state.viewport;
  }) as unknown as { viewport: { width: number; height: number } };

  const [particles, positions, colors] = useMemo(() => {
    const particleData: ParticleData[] = [];
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#10B981'),
    ];
    const weights = [0.4, 0.35, 0.25];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      let colorIdx = 0;
      const r = Math.random();
      let cum = 0;
      for (let j = 0; j < weights.length; j++) {
        cum += weights[j];
        if (r < cum) { colorIdx = j; break; }
      }
      colorArray[i * 3] = palette[colorIdx].r;
      colorArray[i * 3 + 1] = palette[colorIdx].g;
      colorArray[i * 3 + 2] = palette[colorIdx].b;

      particleData.push({
        originalPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.002, (Math.random() - 0.5) * 0.002, (Math.random() - 0.5) * 0.001),
        displacement: new THREE.Vector3(0, 0, 0),
        phase: Math.random() * Math.PI * 2,
      });
    }
    return [particleData, posArray, colorArray];
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  useFrame(({ clock, size }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    const mx = (mouse.current.x / size.width) * viewport.width * 2;
    const my = -(mouse.current.y / size.height) * viewport.height * 2;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      const orbitSpeed = 0.05;
      const cos = Math.cos(orbitSpeed * 0.001);
      const sin = Math.sin(orbitSpeed * 0.001);
      const rx = p.originalPosition.x * cos - p.originalPosition.z * sin;
      const rz = p.originalPosition.x * sin + p.originalPosition.z * cos;

      const driftX = Math.sin(t * 0.3 + p.phase) * 0.1;
      const driftY = Math.cos(t * 0.2 + p.phase) * 0.08;

      const dx = rx + driftX - mx;
      const dy = p.originalPosition.y + driftY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 2.5;
      if (dist < repelRadius && dist > 0.01) {
        const force = (1 - dist / repelRadius) * 0.03;
        p.displacement.x += (dx / dist) * force;
        p.displacement.y += (dy / dist) * force;
      }
      p.displacement.x *= 0.95;
      p.displacement.y *= 0.95;

      pos[i * 3] = rx + driftX + p.displacement.x;
      pos[i * 3 + 1] = p.originalPosition.y + driftY + p.displacement.y;
      pos[i * 3 + 2] = rz;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.003;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}

function ConnectionLines({ count, mouse }: { count: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const particleData = useMemo(() => {
    const data: { x: number; y: number; z: number; phase: number }[] = [];
    const limit = Math.min(count, 80);
    for (let i = 0; i < limit; i++) {
      data.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 10,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  const maxLines = particleData.length * 3;
  const positions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: '#8B5CF6',
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = clock.getElapsedTime();
    const pos = lineRef.current.geometry.attributes.position.array as Float32Array;

    const cos = Math.cos(0.05 * 0.001);
    const sin = Math.sin(0.05 * 0.001);

    let idx = 0;
    const maxConn = 2;
    const connDist = 3;

    for (let i = 0; i < particleData.length; i++) {
      const p1 = particleData[i];
      const rx1 = p1.x * cos - p1.z * sin;
      const rz1 = p1.x * sin + p1.z * cos;
      const x1 = rx1 + Math.sin(t * 0.3 + p1.phase) * 0.1;
      const y1 = p1.y + Math.cos(t * 0.2 + p1.phase) * 0.08;
      const z1 = rz1;

      let conns = 0;
      for (let j = i + 1; j < particleData.length && conns < maxConn; j++) {
        const p2 = particleData[j];
        const rx2 = p2.x * cos - p2.z * sin;
        const rz2 = p2.x * sin + p2.z * cos;
        const x2 = rx2 + Math.sin(t * 0.3 + p2.phase) * 0.1;
        const y2 = p2.y + Math.cos(t * 0.2 + p2.phase) * 0.08;
        const z2 = rz2;

        const dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connDist && idx < maxLines) {
          const base = idx * 6;
          pos[base] = x1; pos[base + 1] = y1; pos[base + 2] = z1;
          pos[base + 3] = x2; pos[base + 4] = y2; pos[base + 5] = z2;
          conns++; idx++;
        }
      }
    }

    lineRef.current.geometry.setDrawRange(0, idx * 2);
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <lineSegments ref={lineRef} geometry={geometry} material={material} />;
}

export default function ParticleField() {
  const mouse = useRef({ x: -9999, y: -9999 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const count = isMobile ? 200 : 500;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ParticlesCore count={count} mouse={mouse} />
          <ConnectionLines count={count} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
