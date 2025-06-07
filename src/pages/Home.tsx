import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Technologies } from '../components/Technologies';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Certificates } from '../components/Certificates';
import { References } from '../components/References';
import { Contact } from '../components/Contact';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Home = () => {
	return (
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.5 }}
		>
			
			<Header/>

			<Hero/>

			<About/>

			<Technologies/>

			<Projects/>

			<Experience />

			<Education />

			<Certificates />

			<References />

			<Contact />

			<Footer/>
		
		</motion.div>
	);
};
