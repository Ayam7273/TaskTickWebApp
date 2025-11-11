import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TaskContext = createContext();

const STORAGE_KEY = 'tasktick_tasks';

// Initialize with demo data if no tasks exist
const getInitialTasks = () => {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			return [];
		}
	}
	// Return empty array - users will create their own tasks
	return [];
};

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState(getInitialTasks);

	// Persist to localStorage whenever tasks change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	}, [tasks]);

	// Add a new task
	const addTask = (taskData) => {
		const newTask = {
			id: Date.now().toString(),
			...taskData,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
		setTasks((prev) => [...prev, newTask]);
		return newTask;
	};

	// Update an existing task
	const updateTask = (id, updates) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task))
		);
	};

	// Delete a task
	const deleteTask = (id) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	// Toggle task completion
	const toggleTask = (id) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
			)
		);
	};

	// Get tasks for a specific date
	const getTasksByDate = (date) => {
		const targetDate = new Date(date).toDateString();
		return tasks.filter((task) => {
			if (!task.date) return false;
			const taskDate = new Date(task.date).toDateString();
			return taskDate === targetDate;
		});
	};

	// Get today's tasks
	const getTodayTasks = () => {
		const today = new Date().toDateString();
		return tasks.filter((task) => {
			if (!task.date) return false;
			const taskDate = new Date(task.date).toDateString();
			return taskDate === today;
		});
	};

	// Get completed tasks
	const getCompletedTasks = () => {
		return tasks.filter((task) => task.completed);
	};

	// Get incomplete tasks
	const getIncompleteTasks = () => {
		return tasks.filter((task) => !task.completed);
	};

	// Calculate free time (24 hours - sleep time - task durations)
	const calculateFreeTime = () => {
		const today = new Date().toDateString();
		const todayTasks = tasks.filter((task) => {
			if (!task.date) return false;
			const taskDate = new Date(task.date).toDateString();
			return taskDate === today && !task.completed;
		});

		let totalMinutes = 0;
		todayTasks.forEach((task) => {
			if (task.startTime && task.endTime) {
				const start = parseTime(task.startTime);
				const end = parseTime(task.endTime);
				const duration = (end - start + 1440) % 1440; // Handle day wrap
				totalMinutes += duration;
			} else if (task.duration) {
				totalMinutes += task.duration;
			}
		});

		const freeMinutes = 1440 - totalMinutes; // 24 hours = 1440 minutes
		return formatDuration(freeMinutes);
	};

	// Helper: Parse time string (e.g., "10:30 AM") to minutes
	const parseTime = (timeStr) => {
		if (!timeStr) return 0;
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':').map(Number);
		let totalMinutes = hours * 60 + minutes;
		if (period === 'PM' && hours !== 12) totalMinutes += 720;
		if (period === 'AM' && hours === 12) totalMinutes -= 720;
		return totalMinutes;
	};

	// Helper: Format minutes to "Xh Ym"
	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours === 0) return `${mins}m`;
		if (mins === 0) return `${hours}h`;
		return `${hours}h ${mins}m`;
	};

	const value = useMemo(
		() => ({
			tasks,
			addTask,
			updateTask,
			deleteTask,
			toggleTask,
			getTasksByDate,
			getTodayTasks,
			getCompletedTasks,
			getIncompleteTasks,
			calculateFreeTime
		}),
		[tasks]
	);

	return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
	const ctx = useContext(TaskContext);
	if (!ctx) throw new Error('useTasks must be used within TaskProvider');
	return ctx;
}

