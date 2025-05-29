import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Briefcase, Phone, Mail } from 'lucide-react';
import type { Reference } from '../types/portfolio';

interface ReferencesProps {
  references: Reference[];
}

export const References = ({ references }: ReferencesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="references" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text">References</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {references.map((reference, index) => (
            <motion.div
              key={`${reference.Name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
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
              
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{reference.Company}</span>
                </div>
                
                {reference.Education && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400 mt-1">•</span>
                    <span className="text-sm">{reference.Education}</span>
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
 