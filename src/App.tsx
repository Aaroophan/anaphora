import  { useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Technologies } from './components/Technologies';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { References } from './components/References';
import { Contact } from './components/Contact';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useThemeStore } from './store/themeStore';
import { portfolioData } from './data/portfolio';

function App() {
  const { darkMode } = useThemeStore();
  
  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main>
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
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
 