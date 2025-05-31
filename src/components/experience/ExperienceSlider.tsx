import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import type { Experience } from '../../types/profile';

interface ExperienceSliderProps {
  experiences: Experience[];
}

export const ExperienceSlider = ({ experiences }: ExperienceSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  if (!experiences || experiences.length === 0) {
    return <div className="text-gray-500 text-center py-10">No experience to display</div>;
  }

  const nextExperience = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const prevExperience = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + experiences.length) % experiences.length);
  };

  const activeExperience = experiences[activeIndex];

  return (
    <div ref={containerRef} className="relative">
      <div className="flex justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Work Experience</h3>

        {experiences.length > 1 && (
          <div className="flex space-x-2">
            <button
              onClick={prevExperience}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous experience"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextExperience}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next experience"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Timeline indicators */}
      {experiences.length > 1 && (
        <div className="flex justify-center space-x-2 mb-8">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              aria-label={`Go to experience ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Experience content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{
              opacity: 0,
              x: reducedMotion ? 0 : 100
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: reducedMotion ? 0 : -100
            }}
            transition={{
              type: reducedMotion ? 'tween' : 'spring',
              stiffness: 100,
              damping: 20
            }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {activeExperience.logo && (
                <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg overflow-hidden p-1">
                  <img
                    src={activeExperience.logo}
                    alt={activeExperience.company}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeExperience.position}
                </h4>

                <div className="text-primary font-medium mb-3">
                  {activeExperience.company}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{activeExperience.startDate} - {activeExperience.endDate || 'Present'}</span>
                  </div>

                  {activeExperience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{activeExperience.location}</span>
                    </div>
                  )}

                  {activeExperience.remote !== undefined && (
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{activeExperience.remote ? 'Remote' : 'On-site'}</span>
                    </div>
                  )}
                </div>

                {activeExperience.description.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {activeExperience.description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
