import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import type { Technology } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface TechGridProps {
  skills: Technology[];
}

export const TechGrid = ({ skills }: TechGridProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  if (!skills || skills.length === 0) {
    return <div className="text-gray-500 text-center py-10">No skills to display</div>;
  }
  
  // Group skills by category
  const categories: { [key: string]: Technology[] } = {};
  skills.forEach((skill) => {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    categories[skill.category].push(skill);
  });
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    },
    onSwipedRight: () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    },
  });

  return (
    <div className="space-y-10 py-6" ref={containerRef} {...handlers}>
      {Object.entries(categories).map(([category, skills], categoryIndex) => (
        <div key={category} className="mb-8">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {category}
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  type: reducedMotion ? 'tween' : 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: reducedMotion ? 0 : categoryIndex * 0.1 + index * 0.05,
                }}
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-center"
              >
                <div className="mb-2 text-primary">
                  {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{skill.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
 