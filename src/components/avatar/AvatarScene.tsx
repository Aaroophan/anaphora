import  { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { useThemeStore } from '../../store/themeStore';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface AvatarSceneProps {
  username: string;
  size?: number;
}

const Avatar3D = ({ username }: { username: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { primaryColor } = useThemeStore();
  
  const avatarSvg = createAvatar(identicon, {
    seed: username,
    backgroundColor: [primaryColor.substring(1)],
  }).toDataUriSync();
  
  const texture = useTexture(avatarSvg);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export const AvatarScene = ({ username, size = 200 }: AvatarSceneProps) => {
  const { reducedMotion } = useAccessibilityStore();
  
  return (
    <div style={{ width: size, height: size }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Avatar3D username={username} />
        {!reducedMotion && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
};
 