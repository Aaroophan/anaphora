import  { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';
import { Home } from './pages/Home';

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

  // Responsive font override for mobile
  const mobileFontStyle = `@media (max-width: 640px) { .mobile-font-override { font-family: 'Comic Sans MS', 'Comic Sans' !important; } }`;

  return (
    <>
      <style>{mobileFontStyle}</style>
      <div className="font-comic min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-opacity duration-500 ease-in-out mobile-font-override">
        <Home />
      </div>
    </>
  );
}

export default App;
 