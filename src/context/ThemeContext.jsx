import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

	useEffect(() => {
		localStorage.setItem('theme', theme);
		// Remove all theme classes
		document.documentElement.classList.remove('dark', 'light', 'amoled');
		// Add the current theme class
		document.documentElement.classList.add(theme);
		
		// Update body background for amoled
		if (theme === 'amoled') {
			document.body.style.backgroundColor = '#000000';
		} else if (theme === 'light') {
			document.body.style.backgroundColor = '#ffffff';
		} else {
			document.body.style.backgroundColor = '#0a0a0a';
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


