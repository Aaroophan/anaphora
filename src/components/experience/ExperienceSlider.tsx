import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import type { Experience } from '../../types/profile';
import { portfolioData } from '../../data/portfolio';

export const ExperienceSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  if (!portfolioData.Experiences || portfolioData.Experiences.length === 0) {
    return <div className="text-gray-500 text-center py-10">No experience to display</div>;
  }

  const nextExperience = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % portfolioData.Experiences.length);
  };

  const prevExperience = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + portfolioData.Experiences.length) % portfolioData.Experiences.length);
  };

  const activeExperience = portfolioData.Experiences[activeIndex];

  return (
    <div ref={containerRef} className="relative">
      <div className="flex justify-between mb-8">
        <h3 className="text-xl font-bold bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
          {"Work Experience".split('').map((letter, idx) => (
            <motion.a
              key={idx}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.05, delay: idx * 0.05 }}
              className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
            >
              {letter}
            </motion.a>
          ))}
        </h3>

        {portfolioData.Experiences.length > 1 && (
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
      {portfolioData.Experiences.length > 1 && (
        <div className="flex justify-center space-x-2 mb-8">
          {portfolioData.Experiences.map((_, index) => (
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
              {activeExperience.Image && (
                <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg overflow-hidden p-1">
                  <img
                    src={activeExperience.Image}
                    alt={activeExperience.Company}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeExperience.Title}
                </h4>

                <div className="text-primary font-medium mb-3">
                  {activeExperience.Company}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{activeExperience.Date}</span>
                  </div>

                  {activeExperience.Location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{activeExperience.Location}</span>
                    </div>
                  )}

                  {activeExperience.JobType !== undefined && (
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{activeExperience.JobType}</span>
                    </div>
                  )}
                </div>

                {activeExperience.Description.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {activeExperience.Description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-gray-700 dark:text-gray-300 text-xl">{item}</span>
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
