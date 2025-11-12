import { useMemo } from 'react';
import Card from '../../components/ui/Card.jsx';
import { useTasks } from '../../context/TaskContext.jsx';

// Helper functions
const parseTime = (timeStr) => {
	if (!timeStr) return 0;
	const [time, period] = timeStr.split(' ');
	const [hours, minutes] = time.split(':').map(Number);
	let totalMinutes = hours * 60 + minutes;
	if (period === 'PM' && hours !== 12) totalMinutes += 720;
	if (period === 'AM' && hours === 12) totalMinutes -= 720;
	return totalMinutes;
};

const formatDuration = (minutes) => {
	if (minutes < 60) return `${minutes} min`;
	const hours = Math.floor(minutes / 60);
	const remainingMins = minutes % 60;
	if (remainingMins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
	return `${hours}h ${remainingMins}m`;
};

export default function AnalysisPage() {
	const { tasks, calculateFreeTime } = useTasks();

	// Calculate statistics
	const stats = useMemo(() => {
		const today = new Date().toDateString();
		const todayTasks = tasks.filter((task) => {
			if (!task.date) return false;
			const taskDate = new Date(task.date).toDateString();
			return taskDate === today && !task.completed;
		});

		// Group tasks by title and sum durations
		const taskDurations = {};
		todayTasks.forEach((task) => {
			const title = task.title;
			let duration = 0;

			if (task.startTime && task.endTime) {
				const start = parseTime(task.startTime);
				const end = parseTime(task.endTime);
				duration = (end - start + 1440) % 1440;
			} else if (task.duration) {
				duration = task.duration;
			}

			if (duration > 0) {
				taskDurations[title] = (taskDurations[title] || 0) + duration;
			}
		});

		// Convert to array and format
		const activities = Object.entries(taskDurations)
			.map(([title, minutes]) => ({
				title,
				minutes,
				formatted: formatDuration(minutes)
			}))
			.sort((a, b) => b.minutes - a.minutes);

		// Calculate free time
		const totalTaskMinutes = todayTasks.reduce((sum, task) => {
			if (task.startTime && task.endTime) {
				const start = parseTime(task.startTime);
				const end = parseTime(task.endTime);
				return sum + ((end - start + 1440) % 1440);
			} else if (task.duration) {
				return sum + task.duration;
			}
			return sum;
		}, 0);

		const freeMinutes = 1440 - totalTaskMinutes; // 24 hours = 1440 minutes
		const freeTimeFormatted = formatDuration(freeMinutes);

		// Calculate percentage for chart
		const freeTimePercentage = (freeMinutes / 1440) * 100;

		return {
			freeTime: freeTimeFormatted,
			freeTimePercentage,
			activities,
			totalTaskMinutes
		};
	}, [tasks]);

	const getColorForActivity = (index) => {
		const colors = [
			'bg-orange-500',
			'bg-blue-500',
			'bg-red-500',
			'bg-green-500',
			'bg-purple-500',
			'bg-pink-500'
		];
		return colors[index % colors.length];
	};

	return (
		<div className="space-y-6">
			<div className="heading-xl">Analysis</div>

			{/* Free Time Chart */}
			<Card className="p-6">
				<div className="flex flex-col items-center">
					{/* Donut Chart */}
					<div className="relative w-64 h-64 mb-6">
						<svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
							{/* Background circle */}
							<circle
								cx="50"
								cy="50"
								r="40"
								fill="none"
								stroke="rgba(255,255,255,0.1)"
								strokeWidth="8"
							/>
							{/* Free time arc */}
							<circle
								cx="50"
								cy="50"
								r="40"
								fill="none"
								stroke="#3b82f6"
								strokeWidth="8"
								strokeDasharray={`${2 * Math.PI * 40}`}
								strokeDashoffset={`${2 * Math.PI * 40 * (1 - stats.freeTimePercentage / 100)}`}
								strokeLinecap="round"
							/>
						</svg>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<div className="text-sm text-muted">Free Time</div>
							<div className="text-3xl font-bold">{stats.freeTime}</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Activities List */}
			{stats.activities.length > 0 ? (
				<div className="space-y-3">
					{stats.activities.map((activity, index) => {
						const percentage = (activity.minutes / 1440) * 100;
						return (
							<Card key={activity.title} className="p-4">
								<div className="flex items-center gap-4">
									<div className={`w-4 h-4 rounded-full ${getColorForActivity(index)}`} />
									<div className="flex-1">
										<div className="flex items-center justify-between mb-2">
											<span className="font-medium">{activity.title}</span>
											<span className="text-sm text-muted">{activity.formatted}</span>
										</div>
										<div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
											<div
												className={`h-full ${getColorForActivity(index)} transition-all`}
												style={{ width: `${percentage}%` }}
											/>
										</div>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			) : (
				<Card className="p-6 text-center text-muted">
					<div className="text-4xl mb-4">📊</div>
					<div>No activity data available</div>
					<p className="text-sm mt-2">Complete some tasks to see your analysis!</p>
				</Card>
			)}
		</div>
	);
}



