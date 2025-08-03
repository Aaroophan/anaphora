import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Home } from './pages/Home';
import { DynamicBackground } from './components/effects/DynamicBackground';
import { Header } from './components/layout/Header';
import { NotFound } from './pages/NotFound';
import { useLocation } from 'react-router-dom';
import Setting from './utils/Settings';
import { portfolioData } from './data/portfolio';
import { Spinner } from './components/ui/Spinner';

// Lazy load components for better performance
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Technologies = lazy(() => import('./components/Technologies').then(module => ({ default: module.Technologies })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Experience = lazy(() => import('./components/Experience').then(module => ({ default: module.Experience })));
const Education = lazy(() => import('./components/Education').then(module => ({ default: module.Education })));
const Certificates = lazy(() => import('./components/Certificates').then(module => ({ default: module.Certificates })));
const References = lazy(() => import('./components/References').then(module => ({ default: module.References })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Login = lazy(() => import('./components/Login/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./components/Login/Register').then(module => ({ default: module.Register })));
const EditProfile = lazy(() => import('./components/Login/Edit').then(module => ({ default: module.EditProfile })));

// Loading fallback component
const PageLoader = () => (
	<div className="flex justify-center items-center min-h-screen">
		<div className="text-center">
			<Spinner size={48} />
			<p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
		</div>
	</div>
);

function Test() {
	const [Server, setServer] = useState<string>('http://127.0.0.1:8000');

	const [data, setData] = useState<Object | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(Server + '/HarkBase_1751919314/READ/v2/AnaphoraTable1', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"Filter": {
							"AnaphoraTestCol3": "AnaphoraTestVal3NEW"
						}
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(String(err));
				}
			} finally {
				setLoading(false);
			}
	}

		fetchData();
	}, []);

	if (loading) return <pre>Loading...</pre>;
	if (error) return <pre>Error: {error}</pre>;

	return <pre>{JSON.stringify(data, null, 2)}</pre>
}


function Router() {

	// return Test()
	
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
						<Route path="About" element={
							<Suspense fallback={<PageLoader />}>
								<About />
							</Suspense>
						} />
						<Route path="Technologies" element={
							<Suspense fallback={<PageLoader />}>
								<Technologies />
							</Suspense>
						} />
						<Route path="Projects" element={
							<Suspense fallback={<PageLoader />}>
								<Projects />
							</Suspense>
						} />
						<Route path="Experience" element={
							<Suspense fallback={<PageLoader />}>
								<Experience />
							</Suspense>
						} />
						<Route path="Education" element={
							<Suspense fallback={<PageLoader />}>
								<Education />
							</Suspense>
						} />
						<Route path="Certificates" element={
							<Suspense fallback={<PageLoader />}>
								<Certificates />
							</Suspense>
						} />
						<Route path="References" element={
							<Suspense fallback={<PageLoader />}>
								<References />
							</Suspense>
						} />
						<Route path="Contact" element={
							<Suspense fallback={<PageLoader />}>
								<Contact />
							</Suspense>
						} />
						<Route path="Login" element={
							<Suspense fallback={<PageLoader />}>
								<Login />
							</Suspense>
						} />
						<Route path="EditProfile" element={
							<Suspense fallback={<PageLoader />}>
								<EditProfile />
							</Suspense>
						} />
					</Route>
					<Route path="Register" element={
						<Suspense fallback={<PageLoader />}>
							<Register />
						</Suspense>
					} />
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