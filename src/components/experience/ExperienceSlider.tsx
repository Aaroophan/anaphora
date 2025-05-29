import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import type { Experience } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface ExperienceSliderProps {
  experiences: Experience[];
}

export const ExperienceSlider = ({ experiences }: ExperienceSliderProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  if (!experiences || experiences.length === 0) {
    return <div className="text-gray-500 text-center py-10">No experiences to display</div>;
  }

  return (
    <div ref={containerRef} className="space-y-10 py-10">
      {experiences.map((experience, index) => {
        const dateString = `${experience.startDate} - ${experience.current ? 'Present' : experience.endDate}`;
        
        return (
          <motion.div
            key={`${experience.company}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              type: reducedMotion ? 'tween' : 'spring',
              stiffness: 50,
              damping: 20,
              delay: reducedMotion ? 0 : index * 0.1,
            }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {experience.logo && (
                <div className="flex-shrink-0">
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {experience.title}
                </h3>
                
                <h4 className="text-lg font-medium text-primary mb-2">
                  {experience.company}
                </h4>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{dateString}</span>
                  </div>
                  
                  {experience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {experience.description}
                </p>
                
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
 