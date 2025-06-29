import { motion } from 'framer-motion';
import { AvatarGenerator } from './AvatarGenerator';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface AvatarSceneProps {
  username: string;
  size?: number;
}

export const AvatarScene = ({ username, size = 200 }: AvatarSceneProps) => {
  const { reducedMotion } = useAccessibilityStore();

  return (
    <motion.div
      className="relative"
      whileHover={reducedMotion ? {} : {
        rotateY: [0, 10, 0, -10, 0],
        transition: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl transform scale-90" />

      {/* Shadow */}
      <div className="absolute bottom-0 w-full h-4 bg-black/20 blur-md rounded-full transform translate-y-1/2 scale-75" />

      {/* Avatar container */}
      <motion.div
        className="relative rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-700/30 shadow-xl"
        style={{ width: size, height: size }}
        animate={reducedMotion ? {} : {
          y: [0, -5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <AvatarGenerator username={username} size={size} />
      </motion.div>
    </motion.div>
  );
};