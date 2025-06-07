import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Briefcase, Phone, Mail } from 'lucide-react';
import type { Reference } from '../types/portfolio';
import { portfolioData } from '../data/portfolio';

export const References = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);
  const ref7 = useRef<HTMLDivElement>(null);
  const ref8 = useRef<HTMLDivElement>(null);
  const ref9 = useRef<HTMLDivElement>(null);
  const ref10 = useRef<HTMLDivElement>(null);
  const ref11 = useRef<HTMLDivElement>(null);
  const ref12 = useRef<HTMLDivElement>(null);
  const ref13 = useRef<HTMLDivElement>(null);
  const ref14 = useRef<HTMLDivElement>(null);
  const ref15 = useRef<HTMLDivElement>(null);
  const ref16 = useRef<HTMLDivElement>(null);

  const isInView1 = useInView(ref1, { once: false });
  const isInView2 = useInView(ref2, { once: false });
  const isInView3 = useInView(ref3, { once: false });
  const isInView4 = useInView(ref4, { once: false });
  const isInView5 = useInView(ref5, { once: false });
  const isInView6 = useInView(ref6, { once: false });
  const isInView7 = useInView(ref7, { once: false });
  const isInView8 = useInView(ref8, { once: false });
  const isInView9 = useInView(ref9, { once: false });
  const isInView10 = useInView(ref10, { once: false });
  const isInView11 = useInView(ref11, { once: false });
  const isInView12 = useInView(ref12, { once: false });
  const isInView13 = useInView(ref13, { once: false });
  const isInView14 = useInView(ref14, { once: false });
  const isInView15 = useInView(ref15, { once: false });
  const isInView16 = useInView(ref16, { once: false });

  const refs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref10, ref11, ref12, ref13, ref14, ref15, ref16];
  const isInViews = [isInView1, isInView2, isInView3, isInView4, isInView5, isInView6, isInView7, isInView8, isInView9, isInView10, isInView11, isInView12, isInView13, isInView14, isInView15, isInView16];

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
            <div ref={refs[index]}>
            <motion.div
              key={`${reference.Name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
                animate={isInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 