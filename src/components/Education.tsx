import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import Setting from '../utils/Settings';

export const Education = () => {
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
                key={`${"project.Name"}-${idx}`}
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
          {Setting.getUserData().Educations.map((education, index) => (
            <div ref={refs[index]} key={`${education.Name}-${index}`}>
            {/* <ParallaxSection className=' backdrop-blur-sm'> */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
                animate={isInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-sm p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/4 flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 mx-auto md:mx-0">
                  <motion.img
                    src={education.Image}
                    alt={education.Name}
                    initial={{ opacity: 0 }}
                    animate={isInViews[index] ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
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
                    {education.Title.split('').map((letter, idx) => (
                      <motion.a
                        key={`${education.Title}-${index+idx}`}
                        initial={{ opacity: 0 }}
                        animate={isInViews[index] ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {letter}
                      </motion.a>
                    ))}
                </h3>
                
                <h4 className="text-lg font-medium text-primary mb-4">
                    {education.Name.split('').map((letter, idx) => (
                      <motion.a
                        key={`${education.Name}-${index+idx}`}
                        initial={{ opacity: 0 }}
                        animate={isInViews[index] ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {letter}
                      </motion.a>
                    ))}
                </h4>
                
                {education.Description.length > 0 && (
                  <ul className="space-y-2">
                    {education.Description.map((item, itemIndex) => (
                      <li key={`${education.Description}-${index+itemIndex}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Award className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
            {/* </ParallaxSection> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 