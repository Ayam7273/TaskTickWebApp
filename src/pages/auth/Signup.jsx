import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signUp } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		setLoading(true);

		try {
			await signUp(email, password, name);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Failed to create account');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="heading-lg">Create your account</div>
			{error && <div className="text-red-400 text-sm">{error}</div>}
			<Input
				label="Name"
				placeholder="Your name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
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
				{loading ? 'Creating account...' : 'Create Account'}
			</Button>
			<p className="text-sm text-muted">
				Already have an account? <Link className="text-primary" to="/login">Login</Link>
			</p>
		</form>
	);
}


