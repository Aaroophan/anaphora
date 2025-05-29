import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { Education } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface EducationTimelineProps {
  education: Education[];
}

export const EducationTimeline = ({ education }: EducationTimelineProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  if (!education || education.length === 0) {
    return <div className="text-gray-500 text-center py-10">No education to display</div>;
  }

  return (
    <div ref={containerRef} className="relative space-y-8 py-4 px-4 sm:px-6 lg:px-8">
      {/* Timeline line */}
      <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />
      
      {education.map((edu, index) => {
        const dateString = `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`;
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={`${edu.institution}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              type: reducedMotion ? 'tween' : 'spring',
              stiffness: 50,
              damping: 20,
              delay: reducedMotion ? 0 : index * 0.1,
            }}
            className={`relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 sm:left-1/2 top-6 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" />
            
            <div className={`${isEven ? 'sm:text-right sm:pr-10' : 'sm:order-last sm:text-left sm:pl-10'}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {edu.degree} in {edu.field}
              </h3>
              
              <h4 className="text-lg font-medium text-primary mb-2">
                {edu.institution}
              </h4>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3 justify-start sm:justify-end">
                <Calendar size={16} />
                <span>{dateString}</span>
              </div>
              
              {edu.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              )}
            </div>
            
            <div className={`${!isEven ? 'sm:text-right sm:pr-10' : 'sm:order-last sm:text-left sm:pl-10'} sm:py-10`}>
              {/* Empty div for layout */}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
 