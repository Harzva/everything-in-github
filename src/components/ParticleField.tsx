import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  originalPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  displacement: THREE.Vector3;
  phase: number;
}

function ParticlesCore({ count, mouseRef }: { count: number; mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

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
    const posArr = posAttr.array as Float32Array;

    const mx = (mouseRef.current.x / size.width) * viewport.width * 2;
    const my = -(mouseRef.current.y / size.height) * viewport.height * 2;

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

      posArr[i * 3] = rx + driftX + p.displacement.x;
      posArr[i * 3 + 1] = p.originalPosition.y + driftY + p.displacement.y;
      posArr[i * 3 + 2] = rz;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.003;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}

export default function ParticleField() {
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setDpr(Math.min(window.devicePixelRatio, 2));
    const onMove = (e: MouseEvent) => { 
      mouseRef.current.x = e.clientX; 
      mouseRef.current.y = e.clientY; 
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const count = isMobile ? 100 : 300;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticlesCore count={count} mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
