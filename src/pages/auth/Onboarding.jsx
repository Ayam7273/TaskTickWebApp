import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import logoNormal from '../../assets/tasktick-logo-normal.svg';

export default function Onboarding() {
	const { markOnboardingSeen } = useAuth();
	const navigate = useNavigate();

	const handleGetStarted = () => {
		markOnboardingSeen();
		navigate('/signup');
	};

	const handleLogin = () => {
		markOnboardingSeen();
		navigate('/login');
	};

	return (
		<div className="space-y-6 text-center">
			<img src={logoNormal} alt="TaskTick" className="mx-auto h-16 w-16" />
			<div className="heading-xl">Welcome to TaskTick</div>
			<p className="text-muted">Organize, prioritize and track your day efficiently.</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<Button onClick={handleLogin} className="w-full">
					Login
				</Button>
				<Button onClick={handleGetStarted} variant="secondary" className="w-full">
					Create Account
				</Button>
			</div>
		</div>
	);
}


