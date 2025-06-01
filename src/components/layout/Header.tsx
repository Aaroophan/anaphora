import  { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { portfolioData } from '../../data/portfolio';
import * as LucideIcons from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useThemeStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

	type NavLink = [string, string | LucideIcon, string];
	const NavLinksDetails: NavLink[] = [
		["/anaphora/", LucideIcons.Home, "Home"],
		["/anaphora/About", LucideIcons.Code2, "About"],
		["/anaphora/Skills", LucideIcons.ListChecks, "Skills"],
		["/anaphora/Projects", LucideIcons.Presentation, "Projects"],
		["/anaphora/Experience", LucideIcons.Building, "Experience"],
		["/anaphora/Education", LucideIcons.GraduationCap, "Education"],
		["/anaphora/Certificates", LucideIcons.BadgeCheck, "Certificates"],
		["/anaphora/Contact", LucideIcons.Contact2, "Contact"]
	];

	const NavigationLinks = NavLinksDetails.map((NavLink, index) => {
		const IconComponent = NavLink[1]

		return(
			<motion.a
				key={index}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				whileHover={{
					scale: [1, 1.2, 0.7, 1.1, 0.9, 1],
					rotate: [0, 10, -8, 3, -12, 0],
					transition: {
						duration: 1,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror"
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
				className="flex items-center px-1 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
				onClick={() => setIsMenuOpen(false)}
				href={NavLink[0]}
				
			>
				{/* <Link to={NavLink[0]} className={index + 1 === NavLinksDetails.length ?
							`` :
							``}> */}
				<IconComponent className="w-4 h-4 mx-1" />
				{NavLink[2].split("").map((letter, idx) => (
					<motion.a
						key={idx}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.1, delay: idx * 0.1 }}
						className="rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
					>
						{letter}
					</motion.a>
				))}
				{/* </Link> */}
			</motion.a>
	)})


	const HeaderSocials = portfolioData.Main.Links.map((HeaderSocial, index) => {
		const IconComponent = LucideIcons[HeaderSocial.Icon as keyof typeof LucideIcons];

		if (!IconComponent) return null;

		return(
			<motion.a
				key={index}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				whileHover={{
					scale: [1, 1.2, 0.7, 1.1, 0.9, 1],
					rotate: [0, 10, -8, 3, -12, 0],
					transition: {
						duration: 1,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror"
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
					key={index}
					href={HeaderSocial.Href}
					target="_blank"
					rel="noopener noreferrer"
					className="p-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
					aria-label={HeaderSocial.Name}
				>
					<IconComponent className="w-5 h-5" />
			</motion.a>
	)})

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/20 dark:bg-gray-900/20 backdrop-blur-md shadow-xl py-1' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-2 lg:px-3">
        <div className="flex justify-between items-center">
				<a className="flex items-center text-xl font-bold text-primary cursor-default">
					  <LucideIcons.Linkedin className="me-5 inline-block no-underline text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" onClick={() => window.location.href = portfolioData.Main.Links[1].Href} />
            	{portfolioData.Main.Name.split(" ")[0].split("").map((letter, index) => (
					<motion.span
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.1, delay: index * 0.1 }}
						onClick={() => location.reload()} 
					>
						<motion.span
							className="inline-block no-underline text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
							animate={{
								rotate: [-5, 5],
								transition: {
									repeat: Infinity,
									repeatType: 'mirror',
									duration: 0.75,
									ease: "easeInOut",
									delay: index * 0.1
								}
							}}
						>
							{letter}
						</motion.span>
					</motion.span>
				))}
          	</a>
          
          <nav className="hidden md:flex space-x-1">
            {NavigationLinks}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-2">
				{HeaderSocials}
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
            >
              	{darkMode ? 
					<motion.i
						initial={{ rotate: 0 }}
						animate={{ rotate: 360 }}
						transition={{
							repeat: Infinity,
							duration: 20,
							ease: "linear",
						}}
						className="inline-block"
					>
						<Sun className="w-5 h-5 text-yellow-700 dark:text-yellow-300" />
					</motion.i>
				: 
					<motion.i
						initial={{ rotate: -20 }}
						animate={{ rotate: 20 }}
						transition={{
							duration: 1,
							ease: "easeInOut",
							repeat: Infinity,
							repeatType: "mirror"
						}}
						className="inline-block"
					>
						<Moon className="w-5 h-5 text-blue-700 dark:text-blue-300" />
					</motion.i>
				}
            </button>
            
            <button
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
			className="md:hidden fixed inset-0 top-16 bg-white/50 dark:bg-gray-900/50  backdrop-blur-md z-40 overflow-y-auto"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {NavigationLinks}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center space-x-6 py-4">
				{HeaderSocials}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
 