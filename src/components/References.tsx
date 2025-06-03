import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Briefcase, Phone, Mail } from 'lucide-react';
import type { Reference } from '../types/portfolio';
import { portfolioData } from '../data/portfolio';

export const References = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section id="references" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
            {"References".split('').map((letter, idx) => (
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {portfolioData.References.map((reference, index) => (
            <motion.div
              key={`${reference.Name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {reference.Name}
                  </h3>
                  <p className="text-primary">{reference.Job}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{reference.Company}</span>
                </div>
                
                {reference.Education && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-xs">{reference.Education}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <a href={`tel:${reference.Phone}`} className="hover:text-primary">
                    {reference.Phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <a href={`mailto:${reference.Email}`} className="hover:text-primary">
                    {reference.Email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
 