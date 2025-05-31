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
import { portfolioData } from '../data/portfolio';
import { Header } from '../components/layout/Header';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header/>
      <Hero
        image={portfolioData.Main.Image}
        greeting={portfolioData.Main.Greeting}
        name={portfolioData.Main.Name}
        tags={portfolioData.Main.Tags}
        links={portfolioData.Main.Links}
        backgrounds={portfolioData.Main.Backgrounds}
      />

      <About description={portfolioData.About.Description} />

      <Technologies technologies={portfolioData.Technologies} />

      <Projects projects={portfolioData.Projects} />

      <Experience experiences={portfolioData.Experiences} />

      <Education educations={portfolioData.Educations} />

      <Certificates certificates={portfolioData.Certificates} />

      <References references={portfolioData.References} />

      <Contact />
    </motion.div>
  );
};
