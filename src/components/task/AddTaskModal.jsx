import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Toggle from '../ui/Toggle';
import { HiClock, HiBell, HiRefresh, HiCalendar } from 'react-icons/hi';

const DURATION_OPTIONS = [30, 60, 90];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AddTaskModal({ isOpen, onClose, task = null, selectedDate = null }) {
	const [title, setTitle] = useState('');
	const [startTime, setStartTime] = useState('10:00 AM');
	const [endTime, setEndTime] = useState('11:00 AM');
	const [duration, setDuration] = useState(60);
	const [customDuration, setCustomDuration] = useState(false);
	const [allDay, setAllDay] = useState(false);
	const [reminder, setReminder] = useState(true);
	const [repeat, setRepeat] = useState(false);
	const [repeatDays, setRepeatDays] = useState([]);
	const [priority, setPriority] = useState('low');
	const [date, setDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);

	// Initialize form when task is provided (edit mode)
	useEffect(() => {
		if (task) {
			setTitle(task.title || '');
			setStartTime(task.startTime || '10:00 AM');
			setEndTime(task.endTime || '11:00 AM');
			setDuration(task.duration || 60);
			setCustomDuration(task.duration && !DURATION_OPTIONS.includes(task.duration));
			setAllDay(task.allDay || false);
			setReminder(task.reminder || false);
			setRepeat(task.repeat || false);
			setRepeatDays(task.repeatDays || []);
			setPriority(task.priority || 'low');
			setDate(task.date || new Date().toISOString().split('T')[0]);
		} else {
			// Reset form for new task
			setTitle('');
			setStartTime('10:00 AM');
			setEndTime('11:00 AM');
			setDuration(60);
			setCustomDuration(false);
			setAllDay(false);
			setReminder(true);
			setRepeat(false);
			setRepeatDays([]);
			setPriority('low');
			setDate(selectedDate || new Date().toISOString().split('T')[0]);
		}
	}, [task, selectedDate, isOpen]);

	// Calculate duration from start/end time
	useEffect(() => {
		if (!allDay && startTime && endTime) {
			const start = parseTime(startTime);
			const end = parseTime(endTime);
			let diff = end - start;
			if (diff < 0) diff += 1440; // Handle day wrap
			setDuration(diff);
		}
	}, [startTime, endTime, allDay]);

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

	const handleTimeChange = (type, value) => {
		const current = type === 'start' ? startTime : endTime;
		const [time, period] = current.split(' ');
		const [hours] = time.split(':').map(Number);

		if (value === 'hour-up') {
			let newHours = hours + 1;
			if (newHours > 12) newHours = 1;
			const newTime = formatTime(parseTime(`${newHours}:${time.split(':')[1]} ${period}`));
			if (type === 'start') setStartTime(newTime);
			else setEndTime(newTime);
		} else if (value === 'hour-down') {
			let newHours = hours - 1;
			if (newHours < 1) newHours = 12;
			const newTime = formatTime(parseTime(`${newHours}:${time.split(':')[1]} ${period}`));
			if (type === 'start') setStartTime(newTime);
			else setEndTime(newTime);
		} else if (value === 'min-up') {
			const currentMinutes = parseTime(current);
			const newMinutes = (currentMinutes + 15) % 1440;
			const newTime = formatTime(newMinutes);
			if (type === 'start') setStartTime(newTime);
			else setEndTime(newTime);
		} else if (value === 'min-down') {
			const currentMinutes = parseTime(current);
			const newMinutes = (currentMinutes - 15 + 1440) % 1440;
			const newTime = formatTime(newMinutes);
			if (type === 'start') setStartTime(newTime);
			else setEndTime(newTime);
		}
	};

	const toggleRepeatDay = (dayIndex) => {
		setRepeatDays((prev) => (prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;

		const taskData = {
			title: title.trim(),
			date,
			startTime: allDay ? null : startTime,
			endTime: allDay ? null : endTime,
			duration: allDay ? null : duration,
			allDay,
			reminder,
			repeat,
			repeatDays: repeat ? repeatDays : [],
			priority,
			completed: task?.completed || false
		};

		if (task) {
			// Update existing task
			onClose(taskData, 'update');
		} else {
			// Create new task
			onClose(taskData, 'create');
		}
	};

	const formatDuration = (mins) => {
		if (mins < 60) return `${mins} min`;
		const hours = Math.floor(mins / 60);
		const remainingMins = mins % 60;
		if (remainingMins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
		return `${hours}h ${remainingMins}m`;
	};

	return (
		<Modal open={isOpen} onClose={() => onClose(null, 'cancel')} title={task ? 'Edit Task' : 'Add Task'} size="lg">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Task Title */}
				<div>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="What would you like to do?"
						className="w-full"
						autoFocus
					/>
				</div>

				{/* Date Selection */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-muted">
						<HiCalendar className="w-5 h-5" />
						<span>Date</span>
					</div>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="bg-surface border border-white/10 rounded-lg px-3 py-2 text-white"
					/>
				</div>

				{/* Time Selection */}
				{!allDay && (
					<div className="space-y-4">
						{/* Start Time */}
						<div>
							<label className="block text-sm font-medium mb-2">Start Time</label>
							<div className="flex items-center gap-4">
								<div className="flex-1 flex items-center justify-center gap-2 bg-surface rounded-lg p-4">
									<button
										type="button"
										onClick={() => handleTimeChange('start', 'hour-up')}
										className="text-2xl text-muted hover:text-white transition-colors"
									>
										↑
									</button>
									<div className="text-xl font-semibold min-w-[100px] text-center">{startTime}</div>
									<button
										type="button"
										onClick={() => handleTimeChange('start', 'hour-down')}
										className="text-2xl text-muted hover:text-white transition-colors"
									>
										↓
									</button>
								</div>
								<div className="flex flex-col gap-2">
									<button
										type="button"
										onClick={() => handleTimeChange('start', 'min-up')}
										className="px-3 py-1 bg-surface rounded text-sm hover:bg-white/10"
									>
										+15m
									</button>
									<button
										type="button"
										onClick={() => handleTimeChange('start', 'min-down')}
										className="px-3 py-1 bg-surface rounded text-sm hover:bg-white/10"
									>
										-15m
									</button>
								</div>
							</div>
						</div>

						{/* End Time */}
						<div>
							<label className="block text-sm font-medium mb-2 text-red-400">End Time</label>
							<div className="flex items-center gap-4">
								<div className="flex-1 flex items-center justify-center gap-2 bg-surface rounded-lg p-4">
									<button
										type="button"
										onClick={() => handleTimeChange('end', 'hour-up')}
										className="text-2xl text-muted hover:text-white transition-colors"
									>
										↑
									</button>
									<div className="text-xl font-semibold min-w-[100px] text-center">{endTime}</div>
									<button
										type="button"
										onClick={() => handleTimeChange('end', 'hour-down')}
										className="text-2xl text-muted hover:text-white transition-colors"
									>
										↓
									</button>
								</div>
								<div className="flex flex-col gap-2">
									<button
										type="button"
										onClick={() => handleTimeChange('end', 'min-up')}
										className="px-3 py-1 bg-surface rounded text-sm hover:bg-white/10"
									>
										+15m
									</button>
									<button
										type="button"
										onClick={() => handleTimeChange('end', 'min-down')}
										className="px-3 py-1 bg-surface rounded text-sm hover:bg-white/10"
									>
										-15m
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Duration */}
				{!allDay && (
					<div>
						<div className="flex items-center justify-between mb-2">
							<label className="block text-sm font-medium">Duration</label>
							<span className="text-sm text-muted">{formatDuration(duration)}</span>
						</div>
						<div className="flex gap-2">
							{DURATION_OPTIONS.map((mins) => (
								<button
									key={mins}
									type="button"
									onClick={() => {
										setDuration(mins);
										setCustomDuration(false);
									}}
									className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
										duration === mins && !customDuration
											? 'bg-primary text-white'
											: 'bg-surface text-white hover:bg-white/10'
									}`}
								>
									{mins} min
								</button>
							))}
							<button
								type="button"
								onClick={() => setCustomDuration(true)}
								className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
									customDuration
										? 'bg-primary text-white'
										: 'bg-surface text-white hover:bg-white/10'
								}`}
							>
								Custom
							</button>
						</div>
						{customDuration && (
							<input
								type="number"
								min="1"
								value={duration}
								onChange={(e) => setDuration(Number(e.target.value))}
								className="mt-2 w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-white"
								placeholder="Enter duration in minutes"
							/>
						)}
					</div>
				)}

				{/* Toggle Options */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<HiClock className="w-5 h-5 text-muted" />
							<span>All Day</span>
						</div>
						<Toggle checked={allDay} onChange={setAllDay} />
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<HiBell className="w-5 h-5 text-muted" />
							<span>Reminder</span>
						</div>
						<Toggle checked={reminder} onChange={setReminder} />
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<HiRefresh className="w-5 h-5 text-muted" />
							<span>Repeat</span>
						</div>
						<Toggle checked={repeat} onChange={setRepeat} />
					</div>
				</div>

				{/* Repeat Days */}
				{repeat && (
					<div>
						<label className="block text-sm font-medium mb-2">Repeat Days</label>
						<div className="flex gap-2">
							{DAYS_OF_WEEK.map((day, index) => (
								<button
									key={index}
									type="button"
									onClick={() => toggleRepeatDay(index)}
									className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
										repeatDays.includes(index)
											? 'bg-primary text-white'
											: 'bg-surface text-white border border-white/10 hover:bg-white/10'
									}`}
								>
									{day[0]}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Priority */}
				<div>
					<label className="block text-sm font-medium mb-2">Priority</label>
					<div className="flex gap-2">
						{PRIORITY_OPTIONS.map((p) => (
							<button
								key={p}
								type="button"
								onClick={() => setPriority(p)}
								className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
									priority === p
										? p === 'high'
											? 'bg-pink-500 text-white'
											: p === 'medium'
											? 'bg-orange-500 text-white'
											: 'bg-blue-500 text-white'
										: 'bg-surface text-white hover:bg-white/10'
								}`}
							>
								{p}
							</button>
						))}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-4">
					<Button type="button" variant="ghost" onClick={() => onClose(null, 'cancel')} className="flex-1">
						Cancel
					</Button>
					<Button type="submit" className="flex-1">
						{task ? 'Update Task' : 'Add Task'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}

