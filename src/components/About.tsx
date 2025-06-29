import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AvatarScene } from './avatar/AvatarScene';
import { LazySection } from './ui/LazySection';
import Setting from '../utils/Settings';

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const paragraphs = Setting.getUserData().About.Description.split('\n\n');

  return (
    <section id="about" className="snap-start py-20 bg-gray-50 dark:bg-gray-900 cursor-default px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-sm py-5" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent">
            {"About Me".split('').map((letter, idx) => (
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
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Avatar Section */}
            <LazySection
              threshold={0.3}
              delay={200}
              className="flex-shrink-0 lg:w-1/3 flex justify-center"
              fallback={
                <div className="w-72 h-72 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              }
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Decorative background elements */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Main Avatar */}
                <AvatarScene 
                  username={Setting.getUserData().Main.Name} 
                  size={280}
                />
                
                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </LazySection>

            {/* Content Section */}
            <div className="lg:w-2/3 space-y-6">
              {paragraphs.map((paragraph, index) => (
                <LazySection
                  key={index}
                  threshold={0.2}
                  delay={index * 150}
                  className="relative"
                  fallback={
                    <div className="h-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                  }
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {/* Decorative line for first paragraph */}
                    {index === 0 && (
                      <motion.div
                        className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    )}
                    
                    <p className="leading-relaxed whitespace-pre-line bg-gradient-to-br from-slate-500 via-slate-700 to-slate-500 dark:from-sky-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent text-lg">
                      {paragraph}
                    </p>
                  </motion.div>
                </LazySection>
              ))}

              {/* Skills highlight section */}
              <LazySection
                threshold={0.2}
                delay={800}
                fallback={
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" />
                }
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-primary/20"
                >
                  <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Quick Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Experience", value: "5+ Years" },
                      { label: "Projects", value: `${Setting.getUserData().Projects.length}+` },
                      { label: "Technologies", value: `${Setting.getUserData().Technologies.length}+` },
                      { label: "Certifications", value: `${Setting.getUserData().Certificates.length}+` }
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 1 + idx * 0.1 }}
                        className="text-center p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
                      >
                        <div className="text-2xl font-bold text-primary">{item.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </LazySection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};