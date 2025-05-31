import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import type { Education } from '../../types/profile';
import { LazyLoad } from '../ui/LazyLoad';

interface EducationTimelineProps {
  education: Education[];
}

export const EducationTimeline = ({ education }: EducationTimelineProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  if (!education || education.length === 0) {
    return <div className="text-gray-500 text-center py-10">No education history to display</div>;
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline center line */}
      <div className="absolute left-0 sm:left-1/2 ml-3 sm:ml-0 transform sm:-translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-12">
        {education.map((edu, index) => {
          // Alternate sides on larger screens
          const isEven = index % 2 === 0;

          return (
            <div key={`${edu.institution}-${index}`} className="relative">
              {/* Content container */}
              <motion.div
                className={`flex flex-col sm:flex-row ${isEven ? 'sm:flex-row-reverse' : ''} items-start gap-8`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: reducedMotion ? 'tween' : 'spring',
                  stiffness: 50,
                  damping: 15
                }}
              >
                {/* Timeline circle */}
                <div className="absolute left-0 sm:left-1/2 ml-3 sm:ml-0 transform sm:-translate-x-1/2 w-7 h-7 rounded-full bg-primary border-4 border-white dark:border-gray-900" />

                {/* Date column */}
                <div className="pl-12 sm:pl-0 sm:w-1/2 sm:pr-10 sm:text-right">
                  <div className="flex sm:flex-row-reverse sm:justify-start items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>
                </div>

                {/* Content column */}
                <div className="pl-12 sm:pl-10 sm:w-1/2">
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                    <div className="flex items-start gap-4">
                      {edu.logo && (
                        <LazyLoad className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={edu.logo}
                            alt={edu.institution}
                            className="w-full h-full object-contain"
                          />
                        </LazyLoad>
                      )}

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <h4 className="text-primary font-medium">{edu.institution}</h4>

                        {edu.field && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{edu.field}</p>
                        )}

                        {edu.gpa && (
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span>GPA: {edu.gpa.toFixed(1)}</span>
                          </div>
                        )}

                        {edu.description && edu.description.length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {edu.description.map((item, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
