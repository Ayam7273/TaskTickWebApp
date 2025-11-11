import { AppRouter } from './routes/AppRouter.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

export default function App() {
	return (
		<ThemeProvider>
			<TaskProvider>
				<AppRouter />
			</TaskProvider>
		</ThemeProvider>
	);
}


