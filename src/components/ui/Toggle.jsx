export default function Toggle({ checked, onChange, label }) {
	return (
		<label className="flex items-center gap-3 cursor-pointer select-none">
			<input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
			<span className="w-10 h-6 rounded-full bg-white/10 peer-checked:bg-primary/80 relative transition-colors">
				<span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:left-[18px]" />
			</span>
			{label && <span className="text-sm text-text/80">{label}</span>}
		</label>
	);
}


