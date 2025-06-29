import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LazySection } from './ui/LazySection';
import { LazyImage } from './ui/LazyImage';
import Setting from '../utils/Settings';

export const Technologies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });

  return (
    <section id="skills" className="py-20 bg-slate-500/20 dark:bg-gray-500/20 backdrop-blur-sm rounded-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent">
            {"Skills & Technologies".split('').map((letter, idx) => (
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
        
        <div className="space-y-12">
          {Setting.getUserData().Technologies.map(([category, skills], categoryIndex) => (
            <LazySection
              key={category}
              threshold={0.1}
              delay={categoryIndex * 200}
              fallback={
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg w-1/3" />
                  <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                    ))}
                  </div>
                </div>
              }
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="text-xl font-bold mb-6 border-l-4 border-primary pl-3 bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent"
              >
                {category.split('').map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.05, delay: idx * 0.05 }}
                    className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {skills.map(([icon, name], skillIndex) => (
                  <LazySection
                    key={`${name}-${skillIndex}`}
                    threshold={0.1}
                    delay={skillIndex * 50}
                    fallback={
                      <div className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                    }
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.1, 
                        delay: categoryIndex * 0.01 + skillIndex * 0.01,
                        type: 'spring',
                      }}
                      whileHover={{ scale: 1.25 }}
                      className="flex flex-col items-center p-4 transition-all duration-300 rounded-lg border-l-2 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-blue-900/10 backdrop-blur-lg"
                    >
                      <div className="w-12 h-12 mb-3 flex items-center justify-center">
                        <LazyImage
                          src={icon}
                          alt={name}
                          className="max-w-full max-h-full object-contain"
                          fallbackSrc={`https://via.placeholder.com/50?text=${name.charAt(0)}`}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                    </motion.div>
                  </LazySection>
                ))}
              </div>
            </LazySection>
          ))}
        </div>
      </div>
    </section>
  );
};