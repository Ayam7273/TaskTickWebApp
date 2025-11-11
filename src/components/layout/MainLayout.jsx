import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../ui/Navbar.jsx';
import Sidebar from '../ui/Sidebar.jsx';
import { HiHome, HiClipboardList, HiCalendar, HiCog } from 'react-icons/hi';

export function MainLayout() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="container-padded grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 py-6">
				<aside className="hidden lg:block">
					<Sidebar />
				</aside>
				<main className="space-y-6">
					<Outlet />
				</main>
			</div>
			<nav className="lg:hidden fixed bottom-4 left-0 right-0 z-30">
				<div className="mx-auto w-[92%] card px-4 py-3 flex items-center justify-around">
					<NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-text/70'}`}>
						<HiHome className="w-5 h-5" />
						<span className="text-xs">Home</span>
					</NavLink>
					<NavLink to="/tasks" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-text/70'}`}>
						<HiClipboardList className="w-5 h-5" />
						<span className="text-xs">Tasks</span>
					</NavLink>
					<NavLink to="/calendar" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-text/70'}`}>
						<HiCalendar className="w-5 h-5" />
						<span className="text-xs">Calendar</span>
					</NavLink>
					<NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-text/70'}`}>
						<HiCog className="w-5 h-5" />
						<span className="text-xs">Settings</span>
					</NavLink>
				</div>
			</nav>
		</div>
	);
}


