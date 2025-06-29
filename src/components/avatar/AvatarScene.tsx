import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Avatar3D } from './Avatar3D';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface AvatarSceneProps {
  username: string;
  size?: number;
}

const AvatarLoader = ({ size }: { size: number }) => (
  <div 
    style={{ width: size, height: size }}
    className="rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-700/30 shadow-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
  >
    <motion.div
      className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
);

export const AvatarScene = ({ username, size = 200 }: AvatarSceneProps) => {
  const { reducedMotion } = useAccessibilityStore();

  return (
    <motion.div
      className="relative"
      whileHover={reducedMotion ? {} : {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
    >
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 blur-xl transform scale-110"
        animate={reducedMotion ? {} : {
          scale: [1.1, 1.2, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Shadow */}
      <div className="absolute bottom-0 w-full h-4 bg-black/20 blur-md rounded-full transform translate-y-1/2 scale-75" />

      {/* Avatar container with floating animation */}
      <motion.div
        className="relative z-10"
        animate={reducedMotion ? {} : {
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Suspense fallback={<AvatarLoader size={size} />}>
          <Avatar3D 
            username={username} 
            size={size}
            autoRotate={!reducedMotion}
          />
        </Suspense>
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
        animate={reducedMotion ? {} : {
          y: [0, -10, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
        animate={reducedMotion ? {} : {
          y: [0, -8, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Interactive hint */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        Click and drag to rotate
      </motion.div>
    </motion.div>
  );
};