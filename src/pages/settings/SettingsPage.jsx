import Card from '../../components/ui/Card.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useState } from 'react';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';

export default function SettingsPage() {
	const { theme, toggle } = useTheme();
	const [openTheme, setOpenTheme] = useState(false);
	const [openPicker, setOpenPicker] = useState(false);
	const [openSwipe, setOpenSwipe] = useState(false);

	return (
		<div className="space-y-6">
			<div className="heading-xl">Settings</div>
			<Card className="p-4">
				<div className="heading-lg mb-4">General Settings</div>
				<div className="divide-y divide-white/5">
					<button className="w-full text-left py-3 hover:bg-white/5 rounded-lg px-2" onClick={() => setOpenTheme(true)}>Theme</button>
					<button className="w-full text-left py-3 hover:bg-white/5 rounded-lg px-2" onClick={() => setOpenPicker(true)}>Time Picker</button>
					<button className="w-full text-left py-3 hover:bg-white/5 rounded-lg px-2" onClick={() => setOpenSwipe(true)}>Swipe Action</button>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center justify-between">
					<div>Dark Mode</div>
					<Toggle checked={theme === 'dark'} onChange={toggle} />
				</div>
			</Card>

			<Modal open={openTheme} onClose={() => setOpenTheme(false)} title="Choose Theme">
				<div className="grid grid-cols-2 gap-3">
					<Button className="w-full">Light</Button>
					<Button className="w-full" variant="ghost">Dark</Button>
					<Button className="w-full" variant="ghost">Amoled</Button>
					<Button className="w-full" variant="ghost">Material You</Button>
				</div>
			</Modal>

			<Modal open={openPicker} onClose={() => setOpenPicker(false)} title="Choose Time Picker Style">
				<p className="text-muted">Scroll and Clock styles (placeholder).</p>
			</Modal>

			<Modal open={openSwipe} onClose={() => setOpenSwipe(false)} title="Choose Swipe Action">
				<div className="grid grid-cols-3 gap-3">
					<Button className="w-full" variant="ghost">None</Button>
					<Button className="w-full" variant="danger">Delete</Button>
					<Button className="w-full">Complete</Button>
				</div>
			</Modal>
		</div>
	);
}


