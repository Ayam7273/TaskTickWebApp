import { NavLink } from 'react-router-dom';
import { HiHome, HiClipboardList, HiCalendar, HiCheckCircle, HiChartBar, HiCog, HiUser } from 'react-icons/hi';

export default function Sidebar() {
	const item = ({ isActive }) =>
		`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white/5 text-primary' : 'text-text/80 hover:bg-white/5'}`;
	return (
		<aside className="card p-3 sticky top-20">
			<nav className="space-y-1">
				<NavLink to="/" className={item}>
					<HiHome className="w-5 h-5" />
					<span>Dashboard</span>
				</NavLink>
				<NavLink to="/tasks" className={item}>
					<HiClipboardList className="w-5 h-5" />
					<span>Tasks</span>
				</NavLink>
				<NavLink to="/calendar" className={item}>
					<HiCalendar className="w-5 h-5" />
					<span>Calendar</span>
				</NavLink>
				<NavLink to="/completed" className={item}>
					<HiCheckCircle className="w-5 h-5" />
					<span>Completed</span>
				</NavLink>
				<NavLink to="/analysis" className={item}>
					<HiChartBar className="w-5 h-5" />
					<span>Analysis</span>
				</NavLink>
				<NavLink to="/settings" className={item}>
					<HiCog className="w-5 h-5" />
					<span>Settings</span>
				</NavLink>
				<NavLink to="/profile" className={item}>
					<HiUser className="w-5 h-5" />
					<span>Profile</span>
				</NavLink>
			</nav>
		</aside>
	);
}


