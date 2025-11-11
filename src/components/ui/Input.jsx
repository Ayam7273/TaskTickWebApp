export default function Input({ label, hint, className = '', ...props }) {
	return (
		<label className={`block ${className}`}>
			{label && <div className="mb-2 text-sm text-muted">{label}</div>}
			<input
				className="w-full bg-card border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60"
				{...props}
			/>
			{hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
		</label>
	);
}


