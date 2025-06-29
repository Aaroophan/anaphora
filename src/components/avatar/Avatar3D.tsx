import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  username: string;
  size?: number;
  autoRotate?: boolean;
}

// Generate deterministic properties based on username
const generateLaptopProps = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash) + username.charCodeAt(i);
    hash |= 0;
  }

  // Generate colors
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 60) % 360;

  const laptopColor = `hsl(${hue1}, 30%, 25%)`; // Dark laptop color
  const screenColor = `hsl(${hue2}, 80%, 60%)`; // Bright screen color
  const accentColor = `hsl(${(hue1 + 180) % 360}, 70%, 50%)`; // Accent color

  return {
    laptopColor,
    screenColor,
    accentColor,
    floatSpeed: 1 + (Math.abs(hash) % 50) / 100, // 1.0 to 1.5
    floatIntensity: 0.3 + (Math.abs(hash) % 20) / 100, // 0.3 to 0.5
  };
};

const LaptopMesh = ({ username }: { username: string }) => {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const props = useMemo(() => generateLaptopProps(username), [username]);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (screenRef.current) {
      // Subtle screen glow animation
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <Float
      speed={props.floatSpeed}
      rotationIntensity={props.floatIntensity}
      floatIntensity={props.floatIntensity}
    >
      <group ref={laptopRef} scale={[1.2, 1.2, 1.2]}>
        {/* Laptop Base */}
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.2, 1.8]} />
          <meshStandardMaterial
            color={props.laptopColor}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Laptop Screen Back */}
        <mesh position={[0, 0.5, -0.85]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[2.3, 1.4, 0.1]} />
          <meshStandardMaterial
            color={props.laptopColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Laptop Screen */}
        <mesh 
          ref={screenRef}
          position={[0, 0.5, -0.8]} 
          rotation={[-0.1, 0, 0]}
        >
          <boxGeometry args={[2.1, 1.2, 0.02]} />
          <meshStandardMaterial
            color={props.screenColor}
            emissive={props.screenColor}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Screen Content - Code Lines */}
        <group position={[0, 0.5, -0.79]} rotation={[-0.1, 0, 0]}>
          {/* Simulate code lines */}
          {[...Array(6)].map((_, i) => (
            <mesh key={i} position={[-0.8, 0.4 - i * 0.15, 0]}>
              <boxGeometry args={[1.6 - (i % 3) * 0.3, 0.03, 0.01]} />
              <meshStandardMaterial
                color="#00ff00"
                emissive="#00ff00"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* Keyboard */}
        <mesh position={[0, -0.18, 0.2]}>
          <boxGeometry args={[2.2, 0.05, 1.2]} />
          <meshStandardMaterial
            color={new THREE.Color(props.laptopColor).multiplyScalar(0.8)}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.15, 0.6]}>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
          <meshStandardMaterial
            color={new THREE.Color(props.laptopColor).multiplyScalar(0.6)}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Power Button (glowing) */}
        <mesh position={[1, -0.1, -0.7]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
          <meshStandardMaterial
            color={props.accentColor}
            emissive={props.accentColor}
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Brand Logo Area */}
        <mesh position={[0, 0.5, -0.95]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
          <meshStandardMaterial
            color={props.accentColor}
            emissive={props.accentColor}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Username on screen */}
        <Text
          position={[0, 0.2, -0.78]}
          rotation={[-0.1, 0, 0]}
          fontSize={0.12}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          {`> ${username.toLowerCase()}_dev`}
        </Text>

        {/* Cursor blink */}
        <mesh position={[0.8, 0.2, -0.78]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.01]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Floating code particles */}
      <group>
        {['<>', '{}', '[]', '/>', '()'].map((symbol, i) => (
          <Text
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 3,
              Math.sin((i / 5) * Math.PI * 2) * 0.5,
              Math.sin((i / 5) * Math.PI * 2) * 3,
            ]}
            fontSize={0.2}
            color={props.accentColor}
            anchorX="center"
            anchorY="middle"
          >
            {symbol}
          </Text>
        ))}
      </group>
    </Float>
  );
};

export const Avatar3D = ({ username, size = 200, autoRotate = true }: Avatar3DProps) => {
  return (
    <div 
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-700/30 shadow-xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup for laptop */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 2, 5]} intensity={0.6} color="#3B82F6" />
        <spotLight
          position={[0, 8, 3]}
          angle={0.4}
          penumbra={1}
          intensity={1.2}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />
        
        {/* Rim lighting */}
        <pointLight position={[0, -2, -5]} intensity={0.4} color="#9333EA" />

        {/* Laptop */}
        <LaptopMesh username={username} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};