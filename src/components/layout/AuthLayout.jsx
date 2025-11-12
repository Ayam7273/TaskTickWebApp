import { Outlet, Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import logoNormal from '../../assets/tasktick-logo-normal.svg';

export function AuthLayout() {
	const { toggle } = useTheme();
	return (
		<div className="min-h-screen grid place-items-center">
			<div className="w-full max-w-md p-6">
				<div className="flex items-center justify-between mb-6">
					<Link className="flex items-center gap-3" to="/onboarding">
						<img src={logoNormal} alt="TaskTick" className="h-8 w-8" />
						<span className="text-xl font-semibold">TaskTick</span>
					</Link>
				</div>
				<div className="card p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
}


