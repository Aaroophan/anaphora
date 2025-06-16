import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';
import Setting from './utils/Settings';
import { portfolioData } from './data/portfolio';

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
            {/* <Route path="/" element={<Home />} />
            <Route path="/About" element={<><Header /><About /></>} />
            <Route path="/Technologies" element={<><Header /><Technologies /></>} />
            <Route path="/Projects" element={<><Header /><Projects /></>} />
            <Route path="/Experience" element={<><Header /><Experience /></>} />
            <Route path="/Education" element={<><Header /><Education /></>} />
            <Route path="/Certificates" element={<><Header /><Certificates /></>} />
            <Route path="/References" element={<><Header /><References /></>} />
            <Route path="/Contact" element={<><Header /><Contact /></>} /> */}
			
			<Route path={`*`} element={<><Header /><NotFound /></>} />
			<Route path="/" element={<Navigate to="/Aaroophan" replace />} />

			{/* <Route path={`/`} element={<Home />} />
            <Route path={`/${Setting.getLocation()}/About`} element={<><Header /><About /></>} />
            <Route path={`/${Setting.getLocation()}/Technologies`} element={<><Header /><Technologies /></>} />
            <Route path={`/${Setting.getLocation()}/Projects`} element={<><Header /><Projects /></>} />
            <Route path={`/${Setting.getLocation()}/Experience`} element={<><Header /><Experience /></>} />
            <Route path={`/${Setting.getLocation()}/Education`} element={<><Header /><Education /></>} />
            <Route path={`/${Setting.getLocation()}/Certificates`} element={<><Header /><Certificates /></>} />
            <Route path={`/${Setting.getLocation()}/References`} element={<><Header /><References /></>} />
            <Route path={`/${Setting.getLocation()}/Contact`} element={<><Header /><Contact /></>} /> */}

			{/* <Route path={`/:username`} element={<Home />} />
            <Route path={`/:username/About`} element={<><Header /><About /></>} />
            <Route path={`/:username/Technologies`} element={<><Header /><Technologies /></>} />
            <Route path={`/:username/Projects`} element={<><Header /><Projects /></>} />
            <Route path={`/:username/Experience`} element={<><Header /><Experience /></>} />
            <Route path={`/:username/Education`} element={<><Header /><Education /></>} />
            <Route path={`/:username/Certificates`} element={<><Header /><Certificates /></>} />
            <Route path={`/:username/References`} element={<><Header /><References /></>} />
            <Route path={`/:username/Contact`} element={<><Header /><Contact /></>} /> */}

            {/* <Route path="/Aaroophan" element={<Home />} >
				<Route path={`/Aaroophan/`} element={<Home />} />
				<Route path={`/Aaroophan/About`} element={<><Header /><About /></>} />
				<Route path={`/Aaroophan/Technologies`} element={<><Header /><Technologies /></>} />
				<Route path={`/Aaroophan/Projects`} element={<><Header /><Projects /></>} />
				<Route path={`/Aaroophan/Experience`} element={<><Header /><Experience /></>} />
				<Route path={`/Aaroophan/Education`} element={<><Header /><Education /></>} />
				<Route path={`/Aaroophan/Certificates`} element={<><Header /><Certificates /></>} />
				<Route path={`/Aaroophan/References`} element={<><Header /><References /></>} />
				<Route path={`/Aaroophan/Contact`} element={<><Header /><Contact /></>} />
			</Route> */}

			{/* User-specific routes with validation */}
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
			</Route>
			
			{/* <Route path="/Aaroophan" element={<Home />}/>
			<Route path="/Aaroophan2" element={<Home />} />
			<Route path="/Shathana" element={<Home />} /> */}
            {/* <Route path={`/Shathana/Projects`} element={<><Header /><Projects /></>} /> */}
          </Routes>
      </div>
    </>
  );
}

function UserRouteWrapper() {
	const { username } = useParams();
	const location = useLocation();

	useEffect(() => {
		if (username && portfolioData[username as keyof typeof portfolioData]) {
			Setting.setUserData(username);
		}
	}, [username]);

	// Check if username is valid
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
 