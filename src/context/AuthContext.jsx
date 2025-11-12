import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
		return localStorage.getItem('hasSeenOnboarding') === 'true';
	});

	useEffect(() => {
		// Check active session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signUp = async (email, password, name) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name: name
				}
			}
		});
		if (error) throw error;
		return data;
	};

	const signIn = async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		return data;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		localStorage.clear();
	};

	const updatePassword = async (newPassword) => {
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword
		});
		if (error) throw error;
		return data;
	};

	const markOnboardingSeen = () => {
		localStorage.setItem('hasSeenOnboarding', 'true');
		setHasSeenOnboarding(true);
	};

	const value = {
		user,
		loading,
		hasSeenOnboarding,
		signUp,
		signIn,
		signOut,
		updatePassword,
		markOnboardingSeen
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}

