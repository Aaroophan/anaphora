import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  marginEffect?: number;
}

export const ParallaxSection = ({ 
  children, 
  className = '', 
  speed = 0.2,
  marginEffect = 0.3
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 30%"]
  });

  // const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  // const marginBottom = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [0, -100 * marginEffect]
  // );

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        scale,
        // marginBottom,
      }}
    >
      {children}
    </motion.div>
  );
}; 