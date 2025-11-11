export default function Button({ children, variant = 'primary', className = '', ...props }) {
	const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors';
	const variants = {
		primary: 'bg-primary/90 hover:bg-primary text-black',
		secondary: 'bg-secondary/90 hover:bg-secondary text-black',
		ghost: 'bg-transparent hover:bg-white/5 text-text',
		danger: 'bg-accent hover:bg-accent/90 text-black'
	};
	return (
		<button className={`${base} ${variants[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
}


