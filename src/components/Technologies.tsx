import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ParallaxSection } from './effects/ParallaxSection';

export const Technologies = () => {
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const ref3 = useRef<HTMLDivElement>(null);
	const ref4 = useRef<HTMLDivElement>(null);
	const ref5 = useRef<HTMLDivElement>(null);
	const ref6 = useRef<HTMLDivElement>(null);
	const ref7 = useRef<HTMLDivElement>(null);
	const ref8 = useRef<HTMLDivElement>(null);

	const isInView1 = useInView(ref1, { once: false });
	const isInView2 = useInView(ref2, { once: false });
  	const isInView3 = useInView(ref3, { once: false });
  	const isInView4 = useInView(ref4, { once: false });
  	const isInView5 = useInView(ref5, { once: false });
  	const isInView6 = useInView(ref6, { once: false });
	const isInView7 = useInView(ref7, { once: false });
	const isInView8 = useInView(ref8, { once: false });

	const refs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8];
	const isInView = [isInView1, isInView2, isInView3, isInView4, isInView5, isInView6, isInView7, isInView8];

  return (
    <section id="skills" className="py-20 bg-slate-500/20 dark:bg-gray-500/20 backdrop-blur-sm rounded-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
			<h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent">
				{"Skills & Technologies".split('').map((letter, idx) => (
					<motion.a
						key={idx}
						initial={{ opacity: 0 }}
						animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.05, delay: idx * 0.05 }}
						className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
					>
						{letter}
					</motion.a>
				))}
			</h2>
        </motion.div>
        
        <div className="space-y-12">
          {portfolioData.Technologies.map(([category, skills], categoryIndex) => (
            <div key={category}  ref={refs[categoryIndex]}>
            {/* <ParallaxSection marginEffect={0.5}> */}
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView[categoryIndex] ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="text-xl font-bold mb-6 border-l-4 border-primary pl-3 bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent"
              >
                {category.split('').map((letter, idx) => (
					<motion.a
						key={idx}
						initial={{ opacity: 0 }}
						animate={isInView[categoryIndex] ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.05, delay: idx * 0.05 }}
						className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
					>
						{letter}
					</motion.a>
				))}
              </motion.h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-4 ">
                {skills.map(([icon, name], skillIndex) => (
                  <motion.div
                    key={`${name}-${skillIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView[categoryIndex] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.1, 
                      delay: categoryIndex * 0.01 + skillIndex * 0.01,
                      type: 'spring',
                    }}
                    whileHover={{ scale: 1.25 }}
                    className="flex flex-col items-center p-4 transition-all duration-300 rounded-lg border-l-2 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-blue-900/10 backdrop-blur-lg"
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <img 
                        src={icon} 
                        alt={name} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=' + name;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* </ParallaxSection> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 