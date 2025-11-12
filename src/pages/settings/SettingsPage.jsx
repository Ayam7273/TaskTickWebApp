import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import ThemeModal from '../../components/settings/ThemeModal.jsx';
import SleepTimeModal from '../../components/settings/SleepTimeModal.jsx';
import TimePickerModal from '../../components/settings/TimePickerModal.jsx';
import SwipeActionModal from '../../components/settings/SwipeActionModal.jsx';
import { HiInformationCircle, HiSun, HiMoon, HiClock, HiHand, HiArrowRight } from 'react-icons/hi';

export default function SettingsPage() {
	const { theme, toggle } = useTheme();
	const { settings } = useSettings();
	const [openTheme, setOpenTheme] = useState(false);
	const [openSleepTime, setOpenSleepTime] = useState(false);
	const [openPicker, setOpenPicker] = useState(false);
	const [openSwipe, setOpenSwipe] = useState(false);

	return (
		<div className="space-y-6">
			<div className="heading-xl">Settings</div>

			{/* About Section */}
			<Card className="p-4">
				<Link
					to="/about"
					className="flex items-center justify-between w-full text-left hover:bg-white/5 rounded-lg px-2 py-3 transition-colors"
				>
					<div className="flex items-center gap-3">
						<HiInformationCircle className="w-5 h-5 text-muted" />
						<span>About</span>
					</div>
					<HiArrowRight className="w-5 h-5 text-muted" />
				</Link>
			</Card>

			{/* General Settings */}
			<div>
				<div className="text-sm text-muted mb-3 px-2">General Settings</div>
				<Card className="p-0 overflow-hidden">
					<button
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
						onClick={() => setOpenTheme(true)}
					>
					<div className="flex items-center gap-3">
						<HiSun className="w-5 h-5 text-muted" />
						<span>Theme</span>
					</div>
						<HiArrowRight className="w-5 h-5 text-muted" />
					</button>
					<button
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-t border-white/5"
						onClick={() => setOpenSleepTime(true)}
					>
						<div className="flex items-center gap-3">
							<HiMoon className="w-5 h-5 text-muted" />
							<span>Sleep Time</span>
						</div>
						<HiArrowRight className="w-5 h-5 text-muted" />
					</button>
					<button
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-t border-white/5"
						onClick={() => setOpenPicker(true)}
					>
						<div className="flex items-center gap-3">
							<HiClock className="w-5 h-5 text-muted" />
							<span>Time Picker</span>
						</div>
						<HiArrowRight className="w-5 h-5 text-muted" />
					</button>
					<button
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-t border-white/5"
						onClick={() => setOpenSwipe(true)}
					>
						<div className="flex items-center gap-3">
							<HiHand className="w-5 h-5 text-muted" />
							<span>Swipe Action</span>
						</div>
						<HiArrowRight className="w-5 h-5 text-muted" />
					</button>
				</Card>
			</div>

			{/* Modals */}
			<ThemeModal isOpen={openTheme} onClose={() => setOpenTheme(false)} />
			<SleepTimeModal isOpen={openSleepTime} onClose={() => setOpenSleepTime(false)} />
			<TimePickerModal isOpen={openPicker} onClose={() => setOpenPicker(false)} />
			<SwipeActionModal isOpen={openSwipe} onClose={() => setOpenSwipe(false)} />
		</div>
	);
}


