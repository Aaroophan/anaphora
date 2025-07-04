import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Setting from '../utils/Settings';
import { LazySection } from './ui/LazySection';

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const paragraphs = Setting.getUserData().About.Description.split('\n\n');

  return (
    <section id="about" className="snap-start py-20 bg-gray-50 dark:bg-gray-900 cursor-default px-4">
      {/* <ParallaxSection className='backdrop-blur-sm'> */}
		  <div className="container mx-auto px-4 sm:px-6 lg:px-8  transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-sm py-5" ref={ref}>
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
        
        <div className="max-w-4xl mx-auto ">
          {paragraphs.map((paragraph, index) => (
            <LazySection
              key={index}
              threshold={0.2}
              delay={index * 150}
              className="relative"
              fallback={
                <div className="h-20 bg-slate-200/50 dark:bg-slate-700/50 animate-pulse rounded-lg" />
              }
            >
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 leading-relaxed whitespace-pre-line bg-gradient-to-br from-slate-500 via-slate-700 to-slate-500 dark:from-sky-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent"
            >
              {paragraph}
            </motion.p>
            </LazySection>
          ))}
        </div>
      </div>
      {/* </ParallaxSection> */}
    </section>
  );
};
 