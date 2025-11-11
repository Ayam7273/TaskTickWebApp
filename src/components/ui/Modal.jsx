import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
	useEffect(() => {
		function onEsc(e) {
			if (e.key === 'Escape') onClose?.();
		}
		if (open) window.addEventListener('keydown', onEsc);
		return () => window.removeEventListener('keydown', onEsc);
	}, [open, onClose]);

	const sizeClasses = {
		sm: 'md:max-w-md',
		md: 'md:max-w-lg',
		lg: 'md:max-w-2xl',
		xl: 'md:max-w-4xl'
	};

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} />
			<div className="absolute inset-x-0 bottom-0 md:inset-0 md:grid md:place-items-center overflow-y-auto">
				<div className={`card w-full ${sizeClasses[size]} md:p-0 p-4 md:rounded-2xl max-h-[90vh] overflow-y-auto`}>
					{title && (
						<div className="p-5 border-b border-white/5">
							<div className="heading-lg">{title}</div>
						</div>
					)}
					<div className="p-5">{children}</div>
					{footer && <div className="p-5 border-t border-white/5">{footer}</div>}
				</div>
			</div>
		</div>
	);
}


