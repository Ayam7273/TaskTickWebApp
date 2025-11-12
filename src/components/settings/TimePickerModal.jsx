import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import { useSettings } from '../../context/SettingsContext.jsx';
import { HiClock } from 'react-icons/hi';

export default function TimePickerModal({ isOpen, onClose }) {
	const { settings, updateSetting } = useSettings();

	const styles = [
		{ id: 'scroll', label: 'Scroll', preview: '10 : 59 AM' },
		{ id: 'clock', label: 'Clock', preview: '10 : 59 AM', icon: true }
	];

	return (
		<Modal open={isOpen} onClose={onClose} title="Choose Time Picker Style">
			<div className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					{styles.map((style) => (
						<button
							key={style.id}
							onClick={() => updateSetting('timePickerStyle', style.id)}
							className={`p-4 rounded-lg border-2 transition-all ${
								settings.timePickerStyle === style.id
									? 'border-primary bg-primary/10'
									: 'border-white/10 bg-surface hover:bg-white/5'
							}`}
						>
							<div className="text-center mb-3">
								{style.icon ? (
									<div className="flex items-center justify-center gap-2 mb-2">
										<HiClock className="w-5 h-5" />
										<span className="text-lg font-semibold">{style.preview}</span>
									</div>
								) : (
									<div className="space-y-1">
										<div className="text-xs text-muted">9</div>
										<div className="text-lg font-semibold border-2 border-primary rounded-lg px-3 py-1">
											{style.preview}
										</div>
										<div className="text-xs text-muted">11</div>
									</div>
								)}
							</div>
							<div
								className={`text-center py-2 rounded-lg text-sm font-medium ${
									settings.timePickerStyle === style.id
										? 'bg-primary text-white'
										: 'bg-surface text-white'
								}`}
							>
								{style.label}
							</div>
						</button>
					))}
				</div>

				<div className="flex items-center justify-between pt-4 border-t border-white/5">
					<span>Enable 24-Hour Format</span>
					<Toggle
						checked={settings.timePicker24Hour}
						onChange={(val) => updateSetting('timePicker24Hour', val)}
					/>
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

