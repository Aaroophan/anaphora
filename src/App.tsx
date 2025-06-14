import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Home } from './pages/Home';
import { About } from './components/About';
import { Technologies } from './components/Technologies';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { References } from './components/References';
import { Contact } from './components/Contact';
import { DynamicBackground } from './components/effects/DynamicBackground';
import { Header } from './components/layout/Header';
import { NotFound } from './pages/NotFound';

function Router() {
  const { darkMode } = useThemeStore();

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Responsive font override for mobile
  const mobileFontStyle = `@media (max-width: 640px) { .mobile-font-override { font-family: 'Comic Sans MS', 'Comic Sans' !important; } }`;

  return (
    <>
      <style>{mobileFontStyle}</style>
      <div className="font-comic min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-opacity duration-500 ease-in-out mobile-font-override">
        <DynamicBackground />
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Technologies" element={<Technologies />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Experience" element={<Experience />} />
            <Route path="/Education" element={<Education />} />
            <Route path="/Certificates" element={<Certificates />} />
            <Route path="/References" element={<References />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

function App() {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
}

export default App;
 