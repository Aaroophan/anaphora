import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import type { Education as EducationType } from '../types/portfolio';
import { portfolioData } from '../data/portfolio';

export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
            {"Education".split('').map((letter, idx) => (
              <motion.a
                key={idx}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.05, delay: idx * 0.05 }}
                className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
              >
                {letter}
              </motion.a>
            ))}</h2>
        </motion.div>
        
        <div className="space-y-12 max-w-4xl mx-auto">
          {portfolioData.Educations.map((education, index) => (
            <motion.div
              key={`${education.Name}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-sm p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/4 flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 mx-auto md:mx-0">
                  <img
                    src={education.Image}
                    alt={education.Name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0Zm9saW8lMjBiYWNrZ3JvdW5kJTIwdGVjaHxlbnwwfHx8fDE3NDg1MTMxNzB8MA&ixlib=rb-4.1.0';
                    }}
                  />
                </div>
                
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{education.Date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.Title}
                </h3>
                
                <h4 className="text-lg font-medium text-primary mb-4">
                  {education.Name}
                </h4>
                
                {education.Description.length > 0 && (
                  <ul className="space-y-2">
                    {education.Description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Award className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
 