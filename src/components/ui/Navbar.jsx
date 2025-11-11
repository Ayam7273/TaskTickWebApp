import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import logoDark from '../../assets/tasktick-logo-dark.svg';
import { HiMenu, HiCalendar, HiFire } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';

export default function Navbar() {
	const { toggle } = useTheme();
	return (
		<header className="sticky top-0 z-40 backdrop-blur bg-bg/70 border-b border-white/5">
			<div className="container-padded h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<img src={logoDark} className="h-7 w-7" alt="TaskTick" />
					<span className="font-semibold">TaskTick</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6 text-sm">
					<NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : 'text-text/80')}>Dashboard</NavLink>
					<NavLink to="/tasks" className={({ isActive }) => (isActive ? 'text-primary' : 'text-text/80')}>Tasks</NavLink>
					<NavLink to="/calendar" className={({ isActive }) => (isActive ? 'text-primary' : 'text-text/80')}>Calendar</NavLink>
					<NavLink to="/completed" className={({ isActive }) => (isActive ? 'text-primary' : 'text-text/80')}>Completed</NavLink>
				</nav>
				<div className="flex items-center gap-2">
					<button onClick={toggle} className="p-2 rounded-lg hover:bg-white/5" aria-label="Toggle theme">
						<HiMenu className="w-5 h-5" />
					</button>
					<Link to="/calendar" className="p-2 rounded-lg hover:bg-white/5">
						<HiCalendar className="w-5 h-5" />
					</Link>
					<button className="p-2 rounded-lg hover:bg-white/5 relative">
						<HiFire className="w-5 h-5 text-orange-500" />
						<span className="absolute -top-1 -right-1 text-xs bg-primary text-black rounded-full w-5 h-5 flex items-center justify-center">0</span>
					</button>
					<Link to="/settings" className="p-2 rounded-lg hover:bg-white/5">
						<MdSettings className="w-5 h-5" />
					</Link>
				</div>
			</div>
		</header>
	);
}


