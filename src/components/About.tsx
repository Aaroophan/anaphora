import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { useRef } from 'react';

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const paragraphs = portfolioData.About.Description.split('\n\n');

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 cursor-default">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
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
          ))}
        </div>
      </div>
    </section>
  );
};
 