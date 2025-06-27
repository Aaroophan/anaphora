import { useState, useEffect, useRef, ReactNode } from 'react';
import React from 'react';
import { motion, useInView } from "framer-motion";
import * as LucideIcons from 'lucide-react';
import Setting from '../utils/Settings';
import GenNumber from '../utils/GenNumber';

export const Hero = () => {
	const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
	// const [currentBackgroundOpacity, setCurrentBackgroundOpacity] = useState(0.15);
	const [currentTagIndex, setCurrentTagIndex] = useState(0);
	const [isVisible, setIsVisible] = useState<Boolean>(false);
	//const { width, height } = useWindowSize();
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: false });
	// const [scrolled, setScrolled] = useState(false);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (window.scrollY > 250) {
	// 			setScrolled(true);
	// 		} else {
	// 			setScrolled(false);
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);

	const tailwindBorderClasses: string[] = [
		// General
		"rounded-xl",
		"rounded-xl2", "rounded-xl3", "rounded-xl4", "rounded-full",

		// Start (s)
		"rounded-s-xl",
		"rounded-s-xl2", "rounded-s-xl3", "rounded-s-xl4",

		// End (e)
		"rounded-e-xl",
		"rounded-e-xl2", "rounded-e-xl3", "rounded-e-xl4",

		// Top (t)
		"rounded-t-xl",
		"rounded-t-xl2", "rounded-t-xl3", "rounded-t-xl4",

		// Right (r)
		"rounded-r-xl",
		"rounded-r-xl2", "rounded-r-xl3", "rounded-r-xl4",

		// Bottom (b)
		"rounded-b-xl",
		"rounded-b-xl2", "rounded-b-xl3", "rounded-b-xl4",

		// Left (l)
		"rounded-l-xl",
		"rounded-l-xl2", "rounded-l-xl3", "rounded-l-xl4",

		// Start-Start (ss)
		"rounded-ss-xl",
		"rounded-ss-xl2", "rounded-ss-xl3", "rounded-ss-xl4",

		// Start-End (se)
		"rounded-se-xl",
		"rounded-se-xl2", "rounded-se-xl3", "rounded-se-xl4",

		// End-End (ee)
		"rounded-ee-xl",
		"rounded-ee-xl2", "rounded-ee-xl3", "rounded-ee-xl4",

		// End-Start (es)
		"rounded-es-xl",
		"rounded-es-xl2", "rounded-es-xl3", "rounded-es-xl4",

		// Top-Left (tl)
		"rounded-tl-xl",
		"rounded-tl-xl2", "rounded-tl-xl3", "rounded-tl-xl4",

		// Top-Right (tr)
		"rounded-tr-xl",
		"rounded-tr-xl2", "rounded-tr-xl3", "rounded-tr-xl4",

		// Bottom-Right (br)
		"rounded-br-xl",
		"rounded-br-xl2", "rounded-br-xl3", "rounded-br-xl4",

		// Bottom-Left (bl)
		"rounded-bl-xl",
		"rounded-bl-xl2", "rounded-bl-xl3", "rounded-bl-xl4",
	];

	const [roundedClasses, setRoundedClasses] = useState<{
													class1: string;
													class2: string;
													class3: string;
												}>({
													class1: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
													class2: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
													class3: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
												});
	useEffect(() => {
		const interval = setInterval(() => {
			setRoundedClasses({
				class1: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
				class2: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
				class3: tailwindBorderClasses[Math.floor(Math.random() * tailwindBorderClasses.length)],
			});
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % Setting.getUserData().Main.Backgrounds.length);
		}, 20000);

		return () => clearInterval(interval);
	}, [Setting.getUserData().Main.Backgrounds.length]);

	useEffect(() => {
		if (!Setting.getUserData().Main.Tags) return;

		const interval = setInterval(() => {
			setIsVisible(false);
			setTimeout(() => {
				setCurrentTagIndex(prev => (prev + 1) % Setting.getUserData().Main.Tags.length);
				setIsVisible(true);
			}, 1000);
		}, 4000);

		return () => clearInterval(interval);
	}, [Setting.getUserData().Main.Tags.length]);


	const Socials = Setting.getUserData().Main.Links.map((Social, index) => {
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
				className="p-2 lg:p-5 rounded-full bg-white dark:bg-slate-700/40 backdrop-blur-sm shadow-lg  hover:scale-100 transition-all text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
				aria-label={Social.Name}
			>
				<IconComponent className="w-6 h-6" />
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
				// setCurrentBackgroundOpacity(Math.random() * 0.1 + 0.1);
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
						{Setting.getUserData().Main.Greeting.split('').map((letter, idx) => (
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
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden ">
	<div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-28">
          {/* Profile Image */}
		  <div className="hidden lg:block w-64 h-64 sm:w-80 sm:h-80 "></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
			className={`block lg:hidden w-64 h-64 sm:w-80 sm:h-80 rounded-xl ${roundedClasses.class1} ${roundedClasses.class2} ${roundedClasses.class3} overflow-hidden border-2 bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-border border-transparent flex-shrink-0 transition-rounded duration-1000 ease-in-out shadow-lg`}
          >
            <img
              src={Setting.getUserData().Main.Images[currentBackgroundIndex]}
              alt={Setting.getUserData().Main.Name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Text Content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1} : { opacity: 0}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
				<div className="text-lg text-gray-600 dark:text-gray-400 mb-2 cursor-default lg:text-left">{TimelyGreeting()}</div>
					<h1 className="pb-4 font-oswald text-7xl sm:text-6xl lg:text-9xl font-bold mb-4 bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 bg-clip-text text-transparent cursor-default">
						{Setting.getUserData().Main.Name.split(' ').map((SplitName, ind) => (
							<React.Fragment key={`name-part-${ind}`}>
								{SplitName.split('').map((letter, idx) => (
									<motion.span
										key={`letter-${ind}-${idx}-${letter}`}
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
							<br/>
							</React.Fragment>
						))}
					</h1>
            </motion.div>
			<h2 className="font-mono font-bold text-center mb-6 cursor-default">
				{Setting.getUserData().Main.Tags[currentTagIndex].split("").map((letter, index) => (
					<motion.span
						key={index}
						initial={{ opacity: 0 }}
						animate={isVisible && isInView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.025, delay: index * 0.01 }}
						className="lg:text-xl bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent lg:m-1 hover:text-primary dark:hover:text-primary transition-colors"
					>
						{letter}
					</motion.span>
				))}
			</h2>
            
            <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1} : { opacity: 0}}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="flex flex-wrap justify-center lg:justify-center gap-3 lg:gap-10"
            >
				{Socials}
            </motion.div>

			{/* <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="flex flex-wrap justify-center lg:justify-center gap-3 lg:gap-10"
			>
				{GenNumber(Setting.getUserData().Projects.length, "g:text-xl bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent lg:m-1 hover:text-primary dark:hover:text-primary transition-colors", 5)}
			</motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
 