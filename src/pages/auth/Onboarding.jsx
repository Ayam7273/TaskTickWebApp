import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

export default function Onboarding() {
	return (
		<div className="space-y-6 text-center">
			<img src="/src/assets/tasktick-logo-normal.svg" alt="TaskTick" className="mx-auto h-16 w-16" />
			<div className="heading-xl">Welcome to TaskTick</div>
			<p className="text-muted">Organize, prioritize and track your day efficiently.</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<Link to="/login"><Button className="w-full">Login</Button></Link>
				<Link to="/signup"><Button variant="secondary" className="w-full">Create Account</Button></Link>
			</div>
		</div>
	);
}


