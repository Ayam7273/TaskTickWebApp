import { AppRouter } from './routes/AppRouter.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';

export default function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<SettingsProvider>
					<TaskProvider>
						<AppRouter />
					</TaskProvider>
				</SettingsProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}


