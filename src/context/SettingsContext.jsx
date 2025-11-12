import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SettingsContext = createContext();

const STORAGE_KEY = 'tasktick_settings';

const defaultSettings = {
	theme: 'dark', // light, dark, amoled
	materialYou: true,
	sleepTimeStart: '09:00 PM',
	sleepTimeEnd: '11:59 PM',
	timePickerStyle: 'scroll', // scroll, clock
	timePicker24Hour: false,
	swipeAction: 'delete' // none, delete, complete
};

const getInitialSettings = () => {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			return { ...defaultSettings, ...JSON.parse(stored) };
		} catch {
			return defaultSettings;
		}
	}
	return defaultSettings;
};

export function SettingsProvider({ children }) {
	const [settings, setSettings] = useState(getInitialSettings);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	}, [settings]);

	const updateSetting = (key, value) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const value = useMemo(
		() => ({
			settings,
			updateSetting
		}),
		[settings]
	);

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
	const ctx = useContext(SettingsContext);
	if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
	return ctx;
}

