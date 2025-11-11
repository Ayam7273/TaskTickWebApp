import { HiClock, HiBell, HiRefresh } from 'react-icons/hi';
import { MdCheckCircle } from 'react-icons/md';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
	const priorityColors = {
		low: 'bg-blue-500',
		medium: 'bg-orange-500',
		high: 'bg-pink-500'
	};
	const priorityColor = priorityColors[task.priority] || 'bg-gray-500';

	return (
		<div className="card p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors">
			<div className={`w-1 h-12 rounded-full ${priorityColor}`} />
			<button
				onClick={() => onToggle?.(task.id)}
				className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
					task.completed ? 'bg-green-500 border-green-500' : 'border-white/30 hover:border-white/50'
				}`}
				aria-label="toggle complete"
			>
				{task.completed && <MdCheckCircle className="w-4 h-4 text-white" />}
			</button>
			<div className="flex-1 min-w-0">
				<div className={`font-medium ${task.completed ? 'line-through text-muted' : ''}`}>{task.title}</div>
				<div className="text-sm text-muted flex items-center gap-2 mt-1">
					<HiClock className="w-4 h-4" />
					<span>{task.timeText || ''}</span>
					{task.reminder && <HiBell className="w-4 h-4 text-primary" />}
					{task.repeat && <HiRefresh className="w-4 h-4 text-primary" />}
				</div>
			</div>
			<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<button onClick={() => onEdit?.(task.id)} className="text-sm text-primary hover:underline">Edit</button>
				<button onClick={() => onDelete?.(task.id)} className="text-sm text-red-400 hover:underline">Delete</button>
			</div>
		</div>
	);
}


