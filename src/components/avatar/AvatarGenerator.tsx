<<<<<<< HEAD
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Avatar3D } from './Avatar3D';
import { useAccessibilityStore } from '../../store/accessibilityStore';
=======
import { useMemo } from 'react';
import { useThemeStore } from '../../store/themeStore';
>>>>>>> bedd710e04e1e01ee632d018266ed4d9b16348aa

interface AvatarGeneratorProps {
  username: string;
  size?: number;
  className?: string;
}

<<<<<<< HEAD
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

export const AvatarGenerator = ({ username, size = 200 }: AvatarGeneratorProps) => {
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
=======
// Fallback SVG avatar for cases where 3D is not needed
export const AvatarGenerator = ({ username, size = 100, className = '' }: AvatarGeneratorProps) => {
  const { primaryColor } = useThemeStore();

  // Generate deterministic SVG based on username
  const svgContent = useMemo(() => {
    // Hash the username for deterministic results
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = ((hash << 5) - hash) + username.charCodeAt(i);
      hash |= 0;
    }

    // Create a deterministic array of colors based on hash
    const getColor = (index: number) => {
      const hue = (hash + index * 50) % 360;
      return `hsl(${hue}, 70%, 60%)`;
    };

    // Create background grid
    const cellSize = 20;
    const numCells = 5;
    const cells: JSX.Element[] = [];

    for (let y = 0; y < numCells; y++) {
      for (let x = 0; x < numCells; x++) {
        // Make it symmetrical
        const shouldFill = (x < Math.floor(numCells / 2) &&
          Math.abs(hash + x * y) % 2 === 0);

        if (shouldFill) {
          cells.push(
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={getColor(x + y)}
            />
          );

          // Add mirrored cell for symmetry
          if (x !== numCells - 1 - x) {
            cells.push(
              <rect
                key={`${numCells - 1 - x}-${y}`}
                x={(numCells - 1 - x) * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={getColor(x + y)}
              />
            );
          }
        }
      }
    }

    // SVG container
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${numCells * cellSize} ${numCells * cellSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          width={numCells * cellSize}
          height={numCells * cellSize}
          fill={primaryColor || '#3B82F6'}
          opacity="0.2"
        />

        {/* Cells */}
        {cells}

        {/* Border */}
        <rect
          width={numCells * cellSize}
          height={numCells * cellSize}
          fill="none"
          stroke={primaryColor || '#3B82F6'}
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>
    );
  }, [username, primaryColor]);

  return (
    <div
      className={`rounded-full overflow-hidden shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      {svgContent}
    </div>
>>>>>>> bedd710e04e1e01ee632d018266ed4d9b16348aa
  );
};