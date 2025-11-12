import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout.jsx';
import { AuthLayout } from '../components/layout/AuthLayout.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import AuthRedirect from '../components/auth/AuthRedirect.jsx';
import Onboarding from '../pages/auth/Onboarding.jsx';
import Login from '../pages/auth/Login.jsx';
import Signup from '../pages/auth/Signup.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import TaskListPage from '../pages/tasks/TaskListPage.jsx';
import TaskDetailsPage from '../pages/tasks/TaskDetailsPage.jsx';
import CalendarPage from '../pages/calendar/CalendarPage.jsx';
import SettingsPage from '../pages/settings/SettingsPage.jsx';
import AboutPage from '../pages/settings/AboutPage.jsx';
import ProfilePage from '../pages/profile/ProfilePage.jsx';
import CompletedPage from '../pages/tasks/CompletedPage.jsx';
import AnalysisPage from '../pages/dashboard/AnalysisPage.jsx';

export function AppRouter() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="/onboarding" element={<Onboarding />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route element={<MainLayout />}>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/tasks" element={<TaskListPage />} />
				<Route path="/tasks/:id" element={<TaskDetailsPage />} />
				<Route path="/calendar" element={<CalendarPage />} />
				<Route path="/completed" element={<CompletedPage />} />
				<Route path="/analysis" element={<AnalysisPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				</Route>
			</Route>

			<Route path="*" element={<AuthRedirect />} />
		</Routes>
	);
}


