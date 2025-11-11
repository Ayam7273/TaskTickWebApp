import { useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import AddTaskModal from '../../components/task/AddTaskModal.jsx';
import FloatingActionButton from '../../components/ui/FloatingActionButton.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { HiChevronLeft, HiChevronRight, HiRefresh } from 'react-icons/hi';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export default function CalendarPage() {
	const { tasks, getTasksByDate, addTask } = useTasks();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	// Get first day of month and number of days
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const daysInPrevMonth = new Date(year, month, 0).getDate();

	// Generate calendar days
	const calendarDays = [];
	// Previous month days
	for (let i = firstDay - 1; i >= 0; i--) {
		calendarDays.push({
			date: new Date(year, month - 1, daysInPrevMonth - i),
			isCurrentMonth: false
		});
	}
	// Current month days
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push({
			date: new Date(year, month, day),
			isCurrentMonth: true
		});
	}
	// Next month days to fill the grid
	const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
	for (let day = 1; day <= remainingDays; day++) {
		calendarDays.push({
			date: new Date(year, month + 1, day),
			isCurrentMonth: false
		});
	}

	const handlePrevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	const handleDateClick = (date) => {
		setSelectedDate(date.toISOString().split('T')[0]);
		setIsAddModalOpen(true);
	};

	const handleModalClose = (taskData, action) => {
		if (action === 'create' && taskData) {
			addTask(taskData);
		}
		setIsAddModalOpen(false);
		setSelectedDate(null);
	};

	const isToday = (date) => {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const getTasksForDate = (date) => {
		return getTasksByDate(date.toISOString().split('T')[0]);
	};

	return (
		<div className="space-y-6 pb-20">
			<div className="flex items-center justify-between">
				<div className="heading-xl">
					{MONTHS[month]} {year}
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={handlePrevMonth}
						className="p-2 hover:bg-white/5 rounded-lg transition-colors"
						aria-label="Previous month"
					>
						<HiChevronLeft className="w-5 h-5" />
					</button>
					<button
						onClick={() => setCurrentDate(new Date())}
						className="p-2 hover:bg-white/5 rounded-lg transition-colors"
						aria-label="Today"
					>
						<HiRefresh className="w-5 h-5" />
					</button>
					<button
						onClick={handleNextMonth}
						className="p-2 hover:bg-white/5 rounded-lg transition-colors"
						aria-label="Next month"
					>
						<HiChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			<Card className="p-4">
				<div className="grid grid-cols-7 gap-2">
					{/* Day headers */}
					{DAYS_OF_WEEK.map((day) => (
						<div key={day} className="text-center text-sm font-medium text-muted py-2">
							{day}
						</div>
					))}

					{/* Calendar days */}
					{calendarDays.map((day, index) => {
						const dateTasks = getTasksForDate(day.date);
						const isCurrentMonth = day.isCurrentMonth;
						const isTodayDate = isToday(day.date);

						return (
							<button
								key={index}
								onClick={() => handleDateClick(day.date)}
								className={`p-2 rounded-lg text-left min-h-[80px] transition-colors ${
									isCurrentMonth
										? isTodayDate
											? 'bg-primary/20 border-2 border-primary'
											: 'bg-surface hover:bg-white/5'
										: 'bg-black/20 text-muted'
								}`}
							>
								<div
									className={`text-sm font-medium mb-1 ${
										isTodayDate ? 'text-primary' : isCurrentMonth ? 'text-white' : 'text-muted'
									}`}
								>
									{day.date.getDate()}
								</div>
								{dateTasks.length > 0 && (
									<div className="space-y-1">
										{dateTasks.slice(0, 2).map((task) => (
											<div
												key={task.id}
												className={`text-xs px-1 py-0.5 rounded truncate ${
													task.completed
														? 'bg-green-500/20 text-green-400'
														: task.priority === 'high'
														? 'bg-pink-500/20 text-pink-400'
														: task.priority === 'medium'
														? 'bg-orange-500/20 text-orange-400'
														: 'bg-blue-500/20 text-blue-400'
												}`}
											>
												{task.title}
											</div>
										))}
										{dateTasks.length > 2 && (
											<div className="text-xs text-muted">+{dateTasks.length - 2} more</div>
										)}
									</div>
								)}
							</button>
						);
					})}
				</div>
			</Card>

			<FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
			<AddTaskModal
				isOpen={isAddModalOpen}
				onClose={handleModalClose}
				selectedDate={selectedDate || new Date().toISOString().split('T')[0]}
			/>
		</div>
	);
}


