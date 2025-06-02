import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, useInView } from "framer-motion";
import { portfolioData } from '../data/portfolio';
import * as LucideIcons from 'lucide-react';

export const Hero = () => {
	const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
	const [currentBackgroundOpacity, setCurrentBackgroundOpacity] = useState(0.15);
	const [currentTagIndex, setCurrentTagIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	//const { width, height } = useWindowSize();
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: false });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % portfolioData.Main.Backgrounds.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [portfolioData.Main.Backgrounds.length]);

	useEffect(() => {
		if (!portfolioData.Main.Tags) return;

		const interval = setInterval(() => {
			setIsVisible(false);
			setTimeout(() => {
				setCurrentTagIndex(prev => (prev + 1) % portfolioData.Main.Tags.length);
				setIsVisible(true);
			}, 1000);
		}, 4000);

		return () => clearInterval(interval);
	}, [portfolioData.Main.Tags.length]);


	const Socials = portfolioData.Main.Links.map((Social, index) => {
		const IconComponent = LucideIcons[Social.Icon as keyof typeof LucideIcons];

		if (!IconComponent) return null;

		return (
			<motion.a
				key={index}
				initial={{ opacity: 0 }}
				animate={isInView ? { opacity: 1} : { opacity: 0}}
				transition={{ duration: 0.25, delay: index * 0.1 }}
				whileHover={{
					scale: [1, 3],
					rotate: [0, 360],
					transition: {
						duration: 0.25,
					}
				}}
				whileTap={{
					scale: [1, 1.2, 0.7, 1.1, 0.9, 1],
					rotate: [0, 10, -8, 3, -12, 0],
					transition: {
						duration: 1,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror"
					}
				}}
				href={Social.Href}
				target="_blank"
				rel="noopener noreferrer"
				className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
				aria-label={Social.Name}
			>
				<IconComponent className="w-5 h-5" />
			</motion.a>
		)
	})

	const TimelyGreeting = () => {
		const [greetingData, setGreetingData] = useState<{
															icon: React.ElementType;
															text: string;
															className: string;
														}>({
															icon: LucideIcons.Coffee,
															text: 'Hello',
															className: '',
														});

		useEffect(() => {
			const interval = setInterval(() => {
				let hour = new Date().getHours();

				if (hour >= 5 && hour < 8) {
					setGreetingData({
						icon: LucideIcons.Coffee,
						text: 'Up early? Let’s build something cool.',
						className: 'bg-gradient-to-br from-orange-400 to-yellow-300 dark:from-orange-300 dark:to-yellow-200 bg-clip-text text-transparent',
					});
				} else if (hour >= 8 && hour < 12) {
					setGreetingData({
						icon: LucideIcons.Compass,
						text: 'Good morning! Ready to explore?',
						className: 'bg-gradient-to-br from-orange-600 to-yellow-400 dark:from-orange-400 dark:to-yellow-200 bg-clip-text text-transparent',
					});
				} else if (hour >= 12 && hour < 15) {
					setGreetingData({
						icon: LucideIcons.Brain,
						text: 'Good afternoon! Let’s dive in.',
						className: 'bg-gradient-to-br from-yellow-400 to-yellow-700 dark:from-yellow-500 dark:to-yellow-100 bg-clip-text text-transparent',
					});
				} else if (hour >= 15 && hour < 18) {
					setGreetingData({
						icon: LucideIcons.Globe,
						text: 'Late afternoon already? Perfect time to browse.',
						className: 'bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-300 dark:to-orange-300 bg-clip-text text-transparent',
					});
				} else if (hour >= 18 && hour < 21) {
					setGreetingData({
						icon: LucideIcons.Sunset,
						text: 'Good evening! Glad to have you here.',
						className: 'bg-gradient-to-br from-yellow-600 to-fuchsia-600 dark:from-yellow-200 dark:to-fuchsia-400 bg-clip-text text-transparent',
					});
				} else if (hour >= 21 || hour < 2) {
					setGreetingData({
						icon: LucideIcons.MoonStar,
						text: 'Visiting me so late? Appreciate your curiosity.',
						className: 'bg-gradient-to-br from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent',
					});
				} else {
					setGreetingData({
						icon: LucideIcons.Sparkles,
						text: 'Burning the midnight oil? You’re awesome.',
						className: 'bg-gradient-to-br from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent',
					});
				}
				setCurrentBackgroundOpacity(Math.random() * 0.2 + 0.1);
			}, 2000);

			return () => clearInterval(interval);
		}, []);

		const { icon: IconComponent, text, className } = greetingData;

		return (<>
					<div className="inline-flex items-center gap-2">
						<i className={className}>
							{text.split('').map((letter, idx) => (
								<motion.a
									key={idx}
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1} : { opacity: 0}}
									transition={{ duration: 0.05, delay: idx * 0.05 }}
									className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
								>
									{letter}
								</motion.a>
							))}
						</i>
						<IconComponent className={"rounded-md text-primary hover:text-secondary dark:hover:text-secondary transition-colors"} />
					</div>
					<div className="mt-4">
						{portfolioData.Main.Greeting.split('').map((letter, idx) => (
								<motion.a
									key={idx}
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1} : { opacity: 0}}
									transition={{ duration: 0.1, delay: idx * 0.1 }}
									className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
								>
									{letter}
								</motion.a>
							))}
					</div>
				</>
		);
	};

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out blur-xs"
        style={{
          backgroundImage: `url(${portfolioData.Main.Backgrounds[currentBackgroundIndex]})`,
          opacity: currentBackgroundOpacity,
        }}
      />
      
      {/* Content Container */}
		  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl border-4 border-primary/20 flex-shrink-0"
          >
            <img
              src={portfolioData.Main.Images[currentBackgroundIndex]}
              alt={portfolioData.Main.Name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1} : { opacity: 0}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
				<p className="text-lg text-gray-600 dark:text-gray-400 mb-2 cursor-default">{TimelyGreeting()}</p>
					<h1 className="p-3 font-caveat text-5xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
						{portfolioData.Main.Name.split('').map((letter, idx) => (
							<motion.span
								key={idx}
								initial={{ opacity: 0, rotate: 0 }}
								animate={isInView ? { opacity: 1, rotate: [-5, 5] } : { opacity: 0 }}
								transition={{ duration: 0.1, delay: idx * 0.05 }}
								whileHover={{
									scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
									rotate: [0, 3, -2, 1.5, -1, 0],
									transition: { duration: 1, ease: "easeInOut" }
								}}
								whileTap={{
									scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
									rotate: [0, 3, -2, 1.5, -1, 0],
									transition: { duration: 1, ease: "easeInOut" }
								}}
								className="rounded-md hover:text-primary dark:hover:text-primary transition-colors"
							>
								{letter}
							</motion.span>
						))}
					</h1>
            </motion.div>
			<h4 className="font-mono font-bold text-center mb-6 cursor-default">
				{portfolioData.Main.Tags[currentTagIndex].split("").map((letter, index) => (
					<motion.span
						key={index}
						initial={{ opacity: 0 }}
						animate={isVisible && isInView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.025, delay: index * 0.01 }}
						className="bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent lg:m-1 hover:text-primary dark:hover:text-primary transition-colors"
					>
						{letter}
					</motion.span>
				))}
			</h4>
            
            <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1} : { opacity: 0}}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="flex flex-wrap justify-center lg:justify-center gap-3 lg:gap-10"
            >
				{Socials}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
 