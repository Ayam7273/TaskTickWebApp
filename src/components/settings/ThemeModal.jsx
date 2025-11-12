import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useSettings } from '../../context/SettingsContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeModal({ isOpen, onClose }) {
	const { settings, updateSetting } = useSettings();
	const { setTheme } = useTheme();

	const themes = [
		{ id: 'light', label: 'Light', bg: 'bg-white', text: 'text-gray-900' },
		{ id: 'dark', label: 'Dark', bg: 'bg-blue-600', text: 'text-white' },
		{ id: 'amoled', label: 'Amoled', bg: 'bg-black', text: 'text-white' }
	];

	const handleThemeChange = (themeId) => {
		updateSetting('theme', themeId);
		setTheme(themeId);
	};

	return (
		<Modal open={isOpen} onClose={onClose} title="Choose Theme">
			<div className="space-y-4">
				<div className="flex gap-3">
					{themes.map((theme) => (
						<button
							key={theme.id}
							onClick={() => handleThemeChange(theme.id)}
							className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
								settings.theme === theme.id
									? `${theme.bg} ${theme.text} ring-2 ring-primary`
									: 'bg-surface text-white hover:bg-white/10'
							}`}
						>
							{theme.label}
						</button>
					))}
				</div>
				<div className="pt-4">
					<Button onClick={onClose} className="w-full">
						Done
					</Button>
				</div>
			</div>
		</Modal>
	);
}

