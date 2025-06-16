import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Technologies } from '../components/Technologies';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Certificates } from '../components/Certificates';
import { References } from '../components/References';
import { Contact } from '../components/Contact';
import { Footer } from '../components/layout/Footer';
import { ProjectsSlider } from '../components/ProjectsSlider'; 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Setting from '../utils/Settings';
import { Header } from '../components/layout/Header';

export const Home = () => {
	const [scrolled, setScrolled] = useState(false);
	const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
	const [currentBackgroundOpacity, setCurrentBackgroundOpacity] = useState(0.15);
	const Location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 250) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}

			// if(Location.pathname.split("/")[1] != null){
			// 	setScrolled(true);
			// }
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % Setting.getUserData().Main.Backgrounds.length);
		}, 20000);

		return () => clearInterval(interval);
	}, [Setting.getUserData().Main.Backgrounds.length]);


	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBackgroundOpacity(Math.random() * 0.1 + 0.1);
		}, 2000);

		return () => clearInterval(interval);
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Background Image with Overlay */}
			<div
				className={`transition-opacity duration-1000 ease-in-out ${scrolled ? 'fixed inset-0 bg-cover bg-center blur-xs' : 'fixed inset-0 bg-cover bg-center'}`}
				style={{
					backgroundImage: `url(${Setting.getUserData().Main.Backgrounds[currentBackgroundIndex]})`,
					opacity: Location.pathname.split("/")[1] == "" ? (scrolled ? currentBackgroundOpacity : 0.5) : 0.5,
				}}
			/>

			<Hero />

			<About />

			<Technologies />

			<ProjectsSlider />

			<Experience />

			<Education />

			<Certificates />

			<References />

			<Contact />

			<Footer />
		</motion.div>
	);
};
