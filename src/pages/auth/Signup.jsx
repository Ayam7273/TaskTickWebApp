import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Signup() {
	return (
		<form className="space-y-4">
			<div className="heading-lg">Create your account</div>
			<Input label="Name" placeholder="Your name" required />
			<Input label="Email" type="email" placeholder="you@example.com" required />
			<Input label="Password" type="password" placeholder="••••••••" required />
			<Button className="w-full">Create Account</Button>
			<p className="text-sm text-muted">
				Already have an account? <Link className="text-primary" to="/login">Login</Link>
			</p>
		</form>
	);
}


