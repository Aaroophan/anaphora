import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  username: string;
  size?: number;
  autoRotate?: boolean;
}

// Generate deterministic properties based on username
const generateAvatarProps = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash) + username.charCodeAt(i);
    hash |= 0;
  }

  // Generate colors
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 120) % 360;
  const hue3 = (hue1 + 240) % 360;

  const color1 = `hsl(${hue1}, 70%, 60%)`;
  const color2 = `hsl(${hue2}, 70%, 60%)`;
  const color3 = `hsl(${hue3}, 70%, 60%)`;

  // Generate shape properties
  const shapeType = Math.abs(hash) % 3; // 0: sphere, 1: box, 2: torus
  const distortionSpeed = 0.5 + (Math.abs(hash) % 100) / 200; // 0.5 to 1.0
  const distortionStrength = 0.1 + (Math.abs(hash) % 50) / 500; // 0.1 to 0.2

  return {
    colors: [color1, color2, color3],
    shapeType,
    distortionSpeed,
    distortionStrength,
    floatSpeed: 1 + (Math.abs(hash) % 50) / 100, // 1.0 to 1.5
    floatIntensity: 0.5 + (Math.abs(hash) % 30) / 100, // 0.5 to 0.8
  };
};

const AvatarMesh = ({ username }: { username: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const props = useMemo(() => generateAvatarProps(username), [username]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const renderShape = () => {
    const commonProps = {
      ref: meshRef,
      scale: [1.2, 1.2, 1.2],
    };

    switch (props.shapeType) {
      case 0:
        return (
          <Sphere {...commonProps} args={[1, 64, 64]}>
            <MeshDistortMaterial
              color={props.colors[0]}
              attach="material"
              distort={props.distortionStrength}
              speed={props.distortionSpeed}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        );
      case 1:
        return (
          <Box {...commonProps} args={[1.5, 1.5, 1.5]}>
            <MeshDistortMaterial
              color={props.colors[1]}
              attach="material"
              distort={props.distortionStrength}
              speed={props.distortionSpeed}
              roughness={0.3}
              metalness={0.6}
            />
          </Box>
        );
      case 2:
        return (
          <Torus {...commonProps} args={[1, 0.4, 16, 100]}>
            <MeshDistortMaterial
              color={props.colors[2]}
              attach="material"
              distort={props.distortionStrength}
              speed={props.distortionSpeed}
              roughness={0.1}
              metalness={0.9}
            />
          </Torus>
        );
      default:
        return null;
    }
  };

  return (
    <Float
      speed={props.floatSpeed}
      rotationIntensity={props.floatIntensity}
      floatIntensity={props.floatIntensity}
    >
      {renderShape()}
      
      {/* Orbiting particles */}
      <group>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 2,
              Math.sin((i / 5) * Math.PI * 2) * 0.5,
              Math.sin((i / 5) * Math.PI * 2) * 2,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={props.colors[i % 3]}
              emissive={props.colors[i % 3]}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export const Avatar3D = ({ username, size = 200, autoRotate = true }: Avatar3DProps) => {
  return (
    <div 
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-700/30 shadow-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333EA" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#3B82F6"
        />

        {/* Avatar */}
        <AvatarMesh username={username} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};