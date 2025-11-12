import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useSettings } from '../../context/SettingsContext.jsx';

export default function SwipeActionModal({ isOpen, onClose }) {
	const { settings, updateSetting } = useSettings();

	const actions = [
		{ id: 'none', label: 'None' },
		{ id: 'delete', label: 'Delete' },
		{ id: 'complete', label: 'Complete' }
	];

	return (
		<Modal open={isOpen} onClose={onClose} title="Choose Swipe Action">
			<div className="space-y-4">
				<div className="flex gap-3">
					{actions.map((action) => (
						<button
							key={action.id}
							onClick={() => {
								updateSetting('swipeAction', action.id);
								onClose();
							}}
							className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
								settings.swipeAction === action.id
									? action.id === 'delete'
										? 'bg-red-500 text-white'
										: action.id === 'complete'
										? 'bg-green-500 text-white'
										: 'bg-primary text-white'
									: 'bg-surface text-white hover:bg-white/10'
							}`}
						>
							{action.label}
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

