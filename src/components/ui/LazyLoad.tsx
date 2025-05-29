import  { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

export const LazyLoad = ({ children, threshold = 0.5, className = '' }: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-full min-h-[100px]">
          <Spinner />
        </div>
      )}
    </div>
  );
};
 