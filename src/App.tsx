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

  return (
    <div className="font-comic min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-opacity duration-500 ease-in-out">
      <Home />
    </div>
  );
}

export default App;
 