import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import type { Experience as ExperienceType } from '../types/portfolio';
import { portfolioData } from '../data/portfolio';

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section id="experience" className="py-20 bg-slate-500/20 dark:bg-gray-500/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
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
          </h2>
        </motion.div>
        
        <div className="space-y-12 max-w-4xl mx-auto">
          {portfolioData.Experiences.map((experience, index) => (
            <motion.div
              key={`${experience.Company}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-6 p-6 transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-sm"
            >
              <div className="md:w-1/4 flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 mx-auto md:mx-0">
                  <img
                    src={experience.Image}
                    alt={experience.Company}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0Zm9saW8lMjBiYWNrZ3JvdW5kJTIwdGVjaHxlbnwwfHx8fDE3NDg1MTMxNzB8MA&ixlib=rb-4.1.0';
                    }}
                  />
                </div>
                
                <div className="text-center md:text-left space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.Date}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Building className="w-4 h-4" />
                    <span>{experience.JobType}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.LocationType}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {experience.Title}
                </h3>
                
                <h4 className="text-lg font-medium text-primary mb-4">
                  {experience.Company}
                </h4>
                
                <h5 className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {experience.Location}
                </h5>
                
                <ul className="space-y-1">
                  {experience.Description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
 