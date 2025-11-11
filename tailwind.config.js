/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#7BA6F9', // accent blue
				secondary: '#FFB84D', // orange used in charts
				accent: '#F28B82', // pink delete
				bg: '#0F1012', // dark background
				surface: '#16181C',
				card: '#1A1C1F',
				text: '#E6E6E6',
				muted: '#9AA0A6',
				success: '#A3E635',
				warn: '#F59E0B'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
			},
			boxShadow: {
				soft: '0 8px 24px rgba(0,0,0,0.24)'
			},
			borderRadius: {
				lg: '16px',
				xl: '20px',
				'2xl': '24px'
			},
			spacing: {
				18: '4.5rem'
			}
		}
	},
	darkMode: 'class',
	plugins: []
};


