import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

	useEffect(() => {
		localStorage.setItem('theme', theme);
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	const value = useMemo(() => ({ theme, setTheme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
}


