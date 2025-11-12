import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useSettings } from '../../context/SettingsContext.jsx';

export default function SleepTimeModal({ isOpen, onClose }) {
	const { settings, updateSetting } = useSettings();
	const [startTime, setStartTime] = useState(settings.sleepTimeStart || '09:00 PM');
	const [endTime, setEndTime] = useState(settings.sleepTimeEnd || '11:59 PM');

	useEffect(() => {
		if (isOpen) {
			setStartTime(settings.sleepTimeStart || '09:00 PM');
			setEndTime(settings.sleepTimeEnd || '11:59 PM');
		}
	}, [isOpen, settings]);

	const parseTime = (timeStr) => {
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':').map(Number);
		let totalMinutes = hours * 60 + minutes;
		if (period === 'PM' && hours !== 12) totalMinutes += 720;
		if (period === 'AM' && hours === 12) totalMinutes -= 720;
		return totalMinutes;
	};

	const formatTime = (minutes) => {
		const hours = Math.floor(minutes / 60) % 12 || 12;
		const mins = minutes % 60;
		const period = Math.floor(minutes / 60) >= 12 ? 'PM' : 'AM';
		return `${hours}:${String(mins).padStart(2, '0')} ${period}`;
	};

	const handleTimeChange = (type, direction) => {
		const current = type === 'start' ? startTime : endTime;
		const currentMinutes = parseTime(current);
		const newMinutes = direction === 'up' ? (currentMinutes + 15) % 1440 : (currentMinutes - 15 + 1440) % 1440;
		const newTime = formatTime(newMinutes);

		if (type === 'start') {
			setStartTime(newTime);
		} else {
			setEndTime(newTime);
		}
	};

	const handleSave = () => {
		updateSetting('sleepTimeStart', startTime);
		updateSetting('sleepTimeEnd', endTime);
		onClose();
	};

	return (
		<Modal open={isOpen} onClose={onClose} title="Set Sleep Time">
			<div className="space-y-6">
				<div className="text-sm text-muted text-center">
					Min - {startTime} Max - {endTime}
				</div>

				{/* Start Time */}
				<div>
					<label className="block text-sm font-medium mb-2">Start Time</label>
					<div className="flex items-center justify-center gap-4 bg-surface rounded-lg p-6">
						<button
							type="button"
							onClick={() => handleTimeChange('start', 'up')}
							className="text-3xl text-muted hover:text-white transition-colors"
						>
							↑
						</button>
						<div className="text-3xl font-semibold min-w-[150px] text-center border-2 border-primary rounded-lg px-4 py-2">
							{startTime}
						</div>
						<button
							type="button"
							onClick={() => handleTimeChange('start', 'down')}
							className="text-3xl text-muted hover:text-white transition-colors"
						>
							↓
						</button>
					</div>
				</div>

				{/* End Time */}
				<div>
					<label className="block text-sm font-medium mb-2 text-red-400">End Time</label>
					<div className="flex items-center justify-center gap-4 bg-surface rounded-lg p-6">
						<button
							type="button"
							onClick={() => handleTimeChange('end', 'up')}
							className="text-3xl text-muted hover:text-white transition-colors"
						>
							↑
						</button>
						<div className="text-3xl font-semibold min-w-[150px] text-center border-2 border-primary rounded-lg px-4 py-2">
							{endTime}
						</div>
						<button
							type="button"
							onClick={() => handleTimeChange('end', 'down')}
							className="text-3xl text-muted hover:text-white transition-colors"
						>
							↓
						</button>
					</div>
				</div>

				<div className="pt-4">
					<Button onClick={handleSave} className="w-full">
						Save
					</Button>
				</div>
			</div>
		</Modal>
	);
}

