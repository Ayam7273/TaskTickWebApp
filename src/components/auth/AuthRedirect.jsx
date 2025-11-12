import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AuthRedirect() {
	const { user, loading, hasSeenOnboarding } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-muted">Loading...</div>
			</div>
		);
	}

	if (user) {
		return <Navigate to="/" replace />;
	}

	if (!hasSeenOnboarding) {
		return <Navigate to="/onboarding" replace />;
	}

	return <Navigate to="/login" replace />;
}

