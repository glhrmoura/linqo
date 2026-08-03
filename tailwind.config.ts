
import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'lexend': ['Lexend', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				linqo: {
					green: '#52C658',
					'green-dark': '#37B65B',
					'green-light': '#6BD75C',
				},
				dark: {
					bg: '#0f172a',
					'bg-secondary': '#1e293b',
					'bg-tertiary': '#334155',
					'bg-quaternary': '#475569',
					text: '#f8fafc',
					'text-secondary': '#cbd5e1',
					'text-tertiary': '#94a3b8',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'toast-slide-in': {
					'0%': { opacity: '0', transform: 'translateX(110%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'toast-slide-out': {
					'0%': { opacity: '1', transform: 'translateX(0)' },
					'100%': { opacity: '0', transform: 'translateX(110%)' },
				},
				'pulse-green': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(82, 198, 88, 0.7)' },
					'70%': { boxShadow: '0 0 0 10px rgba(82, 198, 88, 0)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'toast-slide-in': 'toast-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
				'toast-slide-out': 'toast-slide-out 0.25s ease-in forwards',
				'pulse-green': 'pulse-green 2s infinite',
			}
		}
	},
} satisfies Config;
