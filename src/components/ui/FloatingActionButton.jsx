import { HiPlus } from 'react-icons/hi';

export default function FloatingActionButton({ onClick, label = 'Add Task' }) {
	return (
		<button
			onClick={onClick}
			className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
			aria-label={label}
		>
			<HiPlus className="w-6 h-6" />
		</button>
	);
}

