import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Home } from './pages/Home';
import { DynamicBackground } from './components/effects/DynamicBackground';
import { Header } from './components/layout/Header';
import { NotFound } from './pages/NotFound';
import { useLocation } from 'react-router-dom';
import Setting from './utils/Settings';
import { portfolioData } from './data/portfolio';
import { Login } from './components/Login/Login';
import { Register } from './components/Login/Register';
import { EditProfile } from './components/Login/Edit';

function Router() {
  const { darkMode } = useThemeStore();
  const Location = useLocation();

  useEffect(() => {
    const username = Location.pathname.split('/')[1] || 'Aaroophan';
    Setting.setLocation(username);
    Setting.setUserData(username);

    console.log("Location:", Setting.getLocation());
    console.log("UserData:", Setting.getUserData());
  }, [Location.pathname]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const mobileFontStyle = `@media (max-width: 640px) { .mobile-font-override { font-family: 'Comic Sans MS', 'Comic Sans' !important; } }`;

  return (
    <>
      <style>{mobileFontStyle}</style>
      <div className="font-comic min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-opacity duration-500 ease-in-out mobile-font-override">
        <DynamicBackground />
          <Routes>
			<Route path={`*`} element={<><Header /><NotFound /></>} />
			<Route path="/" element={<Navigate to="/Aaroophan" replace />} />
			<Route path="/About" element={<Navigate to="/Aaroophan/About" replace />} />
			<Route path="/Technologies" element={<Navigate to="/Aaroophan/Technologies" replace />} />
			<Route path="/Projects" element={<Navigate to="/Aaroophan/Projects" replace />} />
			<Route path="/Experience" element={<Navigate to="/Aaroophan/Experience" replace />} />
			<Route path="/Education" element={<Navigate to="/Aaroophan/Education" replace />} />
			<Route path="/Certificates" element={<Navigate to="/Aaroophan/Certificates" replace />} />
			<Route path="/References" element={<Navigate to="/Aaroophan/References" replace />} />
			<Route path="/Contact" element={<Navigate to="/Aaroophan/Contact" replace />} />
			<Route path="/Login" element={<Navigate to="/Aaroophan/Login" replace />} />
			<Route path="/:username" element={<UserRouteWrapper />}>
				<Route index element={<Home />} />
				<Route path="About" element={<About />} />
				<Route path="Technologies" element={<Technologies />} />
				<Route path="Projects" element={<Projects />} />
				<Route path="Experience" element={<Experience />} />
				<Route path="Education" element={<Education />} />
				<Route path="Certificates" element={<Certificates />} />
				<Route path="References" element={<References />} />
				<Route path="Contact" element={<Contact />} />
				<Route path="Login" element={<Login />} />
				<Route path="EditProfile" element={<EditProfile />} />
			</Route>
			<Route path="Register" element={<Register />} />
          </Routes>
      </div>
    </>
  );
}

function UserRouteWrapper() {
  const { username } = useParams();

  useEffect(() => {
    if (username && portfolioData[username as keyof typeof portfolioData]) {
      Setting.setUserData(username);
    }
  }, [username]);

  if (!username || !portfolioData[username as keyof typeof portfolioData]) {
    return <><Header /><NotFound /></>;
  }

  return (
    <>
      <Header />
      <Outlet />
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