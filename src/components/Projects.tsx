import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Projects = () => {
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


  const getLinkIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'link':
        return <ExternalLink className="w-5 h-5" />;
      case 'play-circle':
        return <Play className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <section id="Projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
            {"Projects".split('').map((letter, idx) => (
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.Projects.map((project, index) => (
            <div ref={refs[index]}>
            <motion.div
              key={project.Name}
              initial={{ opacity: 0}}
              animate={isInViews[index] ? { opacity: 1} : { opacity: 0}}
              transition={{ duration: 0.5, delay: index * 0.01 }}
                className="overflow-hidden transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-sm"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.Image} 
                  alt={project.Name} 
                  className="w-full h-full object-fit transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0Zm9saW8lMjBiYWNrZ3JvdW5kJTIwdGVjaHxlbnwwfHx8fDE3NDg1MTMxNzB8MA&ixlib=rb-4.1.0';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.Name.split('').map((letter, idx) => (
                        <motion.a
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={isInViews[index] ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.25, delay: idx * 0.05 }}
                          className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
                        >
                          {letter}
                        </motion.a>
                      ))}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {project.Date}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 transition-all duration-500  line-clamp-5 hover:line-clamp-none">
                  {project.Description}
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.Technologies.split(', ').map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {project.Links.length > 0 && (
                  <div className="flex gap-3">
                    {project.Links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.Href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        aria-label={link.Name}
                        title={link.Name}
                      >
                        {getLinkIcon(link.Icon)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 