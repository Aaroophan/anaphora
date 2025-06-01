import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, FileText, Phone } from 'lucide-react';
import { type SocialLink } from '../types/portfolio';
import { portfolioData } from '../data/portfolio';
import * as LucideIcons from 'lucide-react';

interface HeroProps {
  image: string;
  greeting: string;
  name: string;
  tags: string[];
  links: SocialLink[];
  backgrounds: string[];
}

export const Hero = ({ image, greeting, name, tags, links, backgrounds }: HeroProps) => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % portfolioData.Main.Backgrounds.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [portfolioData.Main.Backgrounds.length]);

  const getSocialIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'envelope-fill':
        return <Mail className="w-5 h-5" />;
      case 'telephone-fill':
        return <Phone className="w-5 h-5" />;
      case 'file-person-fill':
        return <FileText className="w-5 h-5" />;
      default:
        return <span className="w-5 h-5" />;
    }
  };

	const TimelyGreeting = () => {
		const [greeting, setGreeting] = useState<ReactNode>(<i>Hello</i>);

		useEffect(() => {
			const interval = setInterval(() => {
				let hour = new Date().getHours();

				if (hour >= 5 && hour < 8) {
					setGreeting(
						<i className="bg-gradient-to-br from-orange-400 to-yellow-300 dark:from-orange-300 dark:to-yellow-200 bg-clip-text text-transparent">
							Up early? Let’s build something cool. <LucideIcons.Coffee/>
						</i>
					);
				} else if (hour >= 8 && hour < 12) {
					setGreeting(
						<i className="bg-gradient-to-br from-orange-600 to-yellow-400 dark:from-orange-400 dark:to-yellow-200 bg-clip-text text-transparent">
							Good morning! Ready to explore? <LucideIcons.Compass />
						</i>
					);
				} else if (hour >= 12 && hour < 15) {
					setGreeting(
						<i className="bg-gradient-to-br from-yellow-400 to-yellow-700 dark:from-yellow-500 dark:to-yellow-100 bg-clip-text text-transparent">
							Good afternoon! Let’s dive in. <LucideIcons.Brain />
						</i>
					);
				} else if (hour >= 15 && hour < 18) {
					setGreeting(
						<i className="bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-300 dark:to-orange-300 bg-clip-text text-transparent">
							Late afternoon already? Perfect time to browse. <LucideIcons.Globe />
						</i>
					);
				} else if (hour >= 18 && hour < 21) {
					setGreeting(
						<i className="bg-gradient-to-br from-yellow-600 to-fuchsia-600 dark:from-yellow-200 dark:to-fuchsia-400 bg-clip-text text-transparent">
							Good evening! Glad to have you here. <LucideIcons.Sunset />
						</i>
					);
				} else if (hour >= 21 || hour < 2) {
					setGreeting(
						<i className="bg-gradient-to-br from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
							Visiting me so late? Appreciate your curiosity. <LucideIcons.MoonStar />
						</i>
					);
				} else {
					setGreeting(
						<i className="bg-gradient-to-br from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
							Burning the midnight oil? You’re awesome. <LucideIcons.Sparkles />
						</i>
					);
				}
			}, 1000);

			return () => clearInterval(interval);
		}, []);

		return <>{greeting} {portfolioData.Main.Greeting}</>;
	};

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out blur-sm"
        style={{
          backgroundImage: `url(${portfolioData.Main.Backgrounds[currentBackgroundIndex]})`,
          opacity: 0.15,
        }}
      />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
				<p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{TimelyGreeting()}</p>
              	<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text">{portfolioData.Main.Name}</h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {portfolioData.Main.Tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              {portfolioData.Main.Links.map((link, index) => {
                const isEmail = link.Href.startsWith('mailto:') || link.Icon === 'envelope-fill';
                const href = isEmail && !link.Href.startsWith('mailto:') 
                  ? `mailto:${link.Href}`
                  : link.Href;
                
                return (
                  <a
                    key={index}
                    href={href}
                    target={isEmail ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    aria-label={link.Name}
                    title={link.Name}
                  >
                    {getSocialIcon(link.Icon)}
                  </a>
                );
              })}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <a
                href="#about"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                More About Me
                <svg 
                  className="w-4 h-4 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
 