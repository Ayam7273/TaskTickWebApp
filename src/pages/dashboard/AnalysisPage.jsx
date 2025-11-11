import Card from '../../components/ui/Card.jsx';

export default function AnalysisPage() {
	return (
		<div className="space-y-6">
			<div className="heading-xl">Analysis</div>
			<Card className="p-6">
				<div className="text-muted mb-2">Free Time</div>
				<div className="text-3xl font-semibold">10h 04m</div>
			</Card>
			<div className="grid sm:grid-cols-2 gap-4">
				<Card className="p-4 flex items-center justify-between">
					<div>Sleep</div>
					<div>13 hours</div>
				</Card>
				<Card className="p-4 flex items-center justify-between">
					<div>Eat</div>
					<div>55 min</div>
				</Card>
			</div>
		</div>
	);
}


