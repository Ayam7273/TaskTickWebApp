import { useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import TaskCard from '../../components/task/TaskCard.jsx';
import AddTaskModal from '../../components/task/AddTaskModal.jsx';
import SortModal from '../../components/task/SortModal.jsx';
import FloatingActionButton from '../../components/ui/FloatingActionButton.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { Link } from 'react-router-dom';
import { HiFilter } from 'react-icons/hi';

export default function TaskListPage() {
	const { tasks, toggleTask, deleteTask, addTask, updateTask } = useTasks();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isSortModalOpen, setIsSortModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null);
	const [sortBy, setSortBy] = useState('creation-latest-top');

	const incompleteTasks = tasks.filter((t) => !t.completed);

	// Sort tasks
	const sortedTasks = [...incompleteTasks].sort((a, b) => {
		switch (sortBy) {
			case 'priority-low-high':
				const priorityOrder = { low: 1, medium: 2, high: 3 };
				return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
			case 'priority-high-low':
				return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
			case 'start-time-latest-bottom':
				return parseTime(a.startTime) - parseTime(b.startTime);
			case 'start-time-latest-top':
				return parseTime(b.startTime) - parseTime(a.startTime);
			case 'creation-latest-bottom':
				return new Date(a.createdAt) - new Date(b.createdAt);
			case 'creation-latest-top':
				return new Date(b.createdAt) - new Date(a.createdAt);
			default:
				return 0;
		}
	});

	const parseTime = (timeStr) => {
		if (!timeStr) return 0;
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':').map(Number);
		let totalMinutes = hours * 60 + minutes;
		if (period === 'PM' && hours !== 12) totalMinutes += 720;
		if (period === 'AM' && hours === 12) totalMinutes -= 720;
		return totalMinutes;
	};

	const formatTimeText = (task) => {
		if (task.allDay) return 'All Day';
		if (task.startTime && task.endTime) {
			return `${task.startTime} - ${task.endTime}`;
		}
		if (task.startTime) return task.startTime;
		return '';
	};

	const handleAddTask = () => {
		setEditingTask(null);
		setIsAddModalOpen(true);
	};

	const handleEditTask = (taskId) => {
		const task = tasks.find((t) => t.id === taskId);
		if (task) {
			setEditingTask(task);
			setIsAddModalOpen(true);
		}
	};

	const handleModalClose = (taskData, action) => {
		if (action === 'create' && taskData) {
			addTask(taskData);
		} else if (action === 'update' && taskData && editingTask) {
			updateTask(editingTask.id, taskData);
		}
		setIsAddModalOpen(false);
		setEditingTask(null);
	};

	return (
		<div className="space-y-6 pb-20">
			<div className="flex items-center justify-between">
				<div className="heading-xl">Tasks</div>
				<div className="flex items-center gap-2">
					<Link to="/calendar">
						<Button variant="ghost">Calendar</Button>
					</Link>
					<Button onClick={handleAddTask}>Add Task</Button>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="heading-lg">All Tasks</div>
				<button
					onClick={() => setIsSortModalOpen(true)}
					className="text-sm text-primary hover:underline flex items-center gap-1"
				>
					<HiFilter className="w-4 h-4" />
					Sort
				</button>
			</div>
			{sortedTasks.length === 0 ? (
				<div className="text-center py-12 text-muted">
					<div className="text-4xl mb-4">📋</div>
					<div className="heading-md">No Tasks</div>
					<p className="mt-2">Create your first task to get started!</p>
				</div>
			) : (
				<div className="space-y-3">
					{sortedTasks.map((task) => (
						<TaskCard
							key={task.id}
							task={{
								...task,
								timeText: formatTimeText(task)
							}}
							onToggle={toggleTask}
							onEdit={handleEditTask}
							onDelete={deleteTask}
						/>
					))}
				</div>
			)}
			<FloatingActionButton onClick={handleAddTask} />
			<AddTaskModal
				isOpen={isAddModalOpen}
				onClose={handleModalClose}
				task={editingTask}
				selectedDate={new Date().toISOString().split('T')[0]}
			/>
			<SortModal
				isOpen={isSortModalOpen}
				onClose={() => setIsSortModalOpen(false)}
				currentSort={sortBy}
				onSelect={setSortBy}
			/>
		</div>
	);
}


