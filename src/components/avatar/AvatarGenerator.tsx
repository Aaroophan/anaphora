import { useMemo } from 'react';
import { useThemeStore } from '../../store/themeStore';

interface AvatarGeneratorProps {
  username: string;
  size?: number;
  className?: string;
}

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
  );
};