import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Login() {
	return (
		<form className="space-y-4">
			<div className="heading-lg">Login</div>
			<Input label="Email" type="email" placeholder="you@example.com" required />
			<Input label="Password" type="password" placeholder="••••••••" required />
			<Button className="w-full">Continue</Button>
			<p className="text-sm text-muted">
				No account? <Link className="text-primary" to="/signup">Sign up</Link>
			</p>
		</form>
	);
}


