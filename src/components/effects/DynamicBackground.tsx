import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
      else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
      else setTimeOfDay('night');
    };

    const handleScroll = () => {
      setScrollY(0.05);
    };

    updateTimeOfDay();
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const getLightingColor = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'rgba(255, 220, 180, 0.1)';
      case 'afternoon':
        return 'rgba(255, 255, 255, 0.1)';
      case 'evening':
        return 'rgba(255, 150, 100, 0.1)';
      case 'night':
        return 'rgba(100, 100, 255, 0.1)';
    }
  };

  const shapes = [
    { type: 'tetrahedron', size: 100, duration: 20 },
    { type: 'sphere', size: 80, duration: 25 },
    { type: 'cube', size: 60, duration: 15 },
    // { type: 'tetrahedron', size: 80, duration: 15 },
    // { type: 'sphere', size: 60, duration: 20 },
    // { type: 'cube', size: 100, duration: 25 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic lighting overlay */}
      <div
        className="fixed inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 5% ${50 + (scrollY * 0.05)}%, ${getLightingColor()}, transparent 70%)`,
        }}
      />

      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: shape.size,
            height: shape.size,
            opacity: 0.1,
            background: `linear-gradient(45deg, var(--primary-color), var(--secondary-color))`,
            clipPath: shape.type === 'tetrahedron' 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : shape.type === 'sphere'
              ? 'circle(50% at 50% 50%)'
              : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
      ))}
    </div>
  );
}; 