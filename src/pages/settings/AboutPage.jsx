import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import logoDark from '../../assets/tasktick-logo-dark.svg';
import { HiArrowLeft } from 'react-icons/hi';
import { HiPencil, HiClock, HiSortAscending, HiChartBar, HiMoon, HiCalendar, HiRefresh } from 'react-icons/hi';

const features = [
	{
		icon: HiPencil,
		title: 'Create and Edit Tasks',
		color: 'text-yellow-400'
	},
	{
		icon: HiClock,
		title: 'Pomodoro Timer',
		color: 'text-blue-400'
	},
	{
		icon: HiSortAscending,
		title: 'Sort Tasks',
		color: 'text-blue-400'
	},
	{
		icon: HiChartBar,
		title: 'Analyze Free Time',
		color: 'text-gray-400'
	},
	{
		icon: HiMoon,
		title: 'Set Sleep Time',
		color: 'text-yellow-400'
	},
	{
		icon: HiCalendar,
		title: 'Manage tasks in Calendar View',
		color: 'text-blue-400'
	},
	{
		icon: HiRefresh,
		title: 'Repeatable Tasks with Notification',
		color: 'text-orange-400'
	}
];

export default function AboutPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Link to="/settings" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
					<HiArrowLeft className="w-6 h-6" />
				</Link>
				<div className="heading-xl">About</div>
			</div>

			{/* App Branding */}
			<div className="flex flex-col items-center py-8">
				<img src={logoDark} alt="TaskTick" className="w-20 h-20 mb-4" />
				<div className="heading-xl mb-2">TaskTick</div>
			</div>

			{/* About Text */}
			<Card className="p-6">
				<div className="text-muted leading-relaxed">
					<p className="mb-4">
						TaskTick is a modern task management application designed to help you organize, prioritize, and
						track your daily tasks efficiently.
					</p>
					<p>
						With features like calendar integration, time tracking, sleep time management, and smart task
						analysis, TaskTick helps you make the most of your time.
					</p>
				</div>
			</Card>

			{/* Features */}
			<div>
				<div className="heading-lg mb-4 text-orange-400">Features</div>
				<div className="space-y-2">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<Card key={index} className="p-4">
								<div className="flex items-center gap-4">
									<div className={`${feature.color}`}>
										<Icon className="w-6 h-6" />
									</div>
									<span>{feature.title}</span>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}

