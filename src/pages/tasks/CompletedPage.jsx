import TaskCard from '../../components/task/TaskCard.jsx';
import { useTasks } from '../../context/TaskContext.jsx';

export default function CompletedPage() {
	const { getCompletedTasks, toggleTask, deleteTask } = useTasks();
	const completedTasks = getCompletedTasks();

	const formatTimeText = (task) => {
		if (task.allDay) return 'All Day';
		if (task.startTime && task.endTime) {
			return `${task.startTime} - ${task.endTime}`;
		}
		if (task.startTime) return task.startTime;
		return '';
	};

	return (
		<div className="space-y-6">
			<div className="heading-xl">Completed Tasks</div>
			{completedTasks.length === 0 ? (
				<div className="text-center py-12 text-muted">
					<div className="text-4xl mb-4">✅</div>
					<div className="heading-md">No Completed Tasks</div>
					<p className="mt-2">Complete some tasks to see them here!</p>
				</div>
			) : (
				<div className="space-y-3">
					{completedTasks.map((task) => (
						<TaskCard
							key={task.id}
							task={{
								...task,
								timeText: formatTimeText(task)
							}}
							onToggle={toggleTask}
							onDelete={deleteTask}
						/>
					))}
				</div>
			)}
		</div>
	);
}


