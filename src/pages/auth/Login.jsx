import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signIn } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await signIn(email, password);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Failed to sign in');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="heading-lg">Login</div>
			{error && <div className="text-red-400 text-sm">{error}</div>}
			<Input
				label="Email"
				type="email"
				placeholder="you@example.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<Input
				label="Password"
				type="password"
				placeholder="••••••••"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? 'Signing in...' : 'Continue'}
			</Button>
			<p className="text-sm text-muted">
				No account? <Link className="text-primary" to="/signup">Sign up</Link>
			</p>
		</form>
	);
}


