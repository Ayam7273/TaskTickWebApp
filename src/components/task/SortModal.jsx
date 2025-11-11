import Modal from '../ui/Modal';
import Button from '../ui/Button';

const SORT_OPTIONS = [
	{ value: 'priority-low-high', label: 'Priority (Low to High)' },
	{ value: 'priority-high-low', label: 'Priority (High to Low)' },
	{ value: 'start-time-latest-bottom', label: 'Start Time (Latest at Bottom)' },
	{ value: 'start-time-latest-top', label: 'Start Time (Latest at Top)' },
	{ value: 'creation-latest-bottom', label: 'Creation Time (Latest at Bottom)' },
	{ value: 'creation-latest-top', label: 'Creation Time (Latest at Top)' }
];

export default function SortModal({ isOpen, onClose, currentSort, onSelect }) {
	const handleSelect = (value) => {
		onSelect(value);
		onClose();
	};

	return (
		<Modal open={isOpen} onClose={onClose} title="Sort Tasks by">
			<div className="space-y-2">
				{SORT_OPTIONS.map((option) => (
					<button
						key={option.value}
						onClick={() => handleSelect(option.value)}
						className={`w-full text-left p-3 rounded-lg transition-colors ${
							currentSort === option.value
								? 'bg-primary text-white'
								: 'bg-surface hover:bg-white/5 text-white'
						}`}
					>
						<div className="flex items-center justify-between">
							<span>{option.label}</span>
							{currentSort === option.value && (
								<div className="w-2 h-2 rounded-full bg-white" />
							)}
						</div>
					</button>
				))}
			</div>
			<div className="mt-6 flex justify-end">
				<Button variant="ghost" onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
}

