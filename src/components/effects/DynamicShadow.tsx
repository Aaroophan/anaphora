import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DynamicShadowProps {
  children: React.ReactNode;
  className?: string;
}

export const DynamicShadow = ({ children, className = '' }: DynamicShadowProps) => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const shadowBlur = useTransform(scrollYProgress, [0, 1], [10, 30]);
  const shadowSpread = useTransform(scrollYProgress, [0, 1], [0, 20]);
  // const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getShadowColor = () => {
    const hour = new Date().getHours();
    if (hour >= 17 || hour < 5) {
      return 'rgba(0, 0, 0, 0.3)';
    }
    return 'rgba(0, 0, 0, 0.2)';
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        boxShadow: `${scrollY * 0.05}px ${scrollY * 0.05}px ${shadowBlur}px ${shadowSpread}px ${getShadowColor()}`,
      }}
      whileHover={{
        boxShadow: `${scrollY * 0.05 + 5}px ${scrollY * 0.05 + 5}px ${shadowBlur.get() + 10}px ${shadowSpread.get() + 5}px ${getShadowColor()}`,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}; 