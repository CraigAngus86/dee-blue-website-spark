import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'rgb(var(--primary))',
					dark: 'rgb(var(--primary-dark))',
					light: 'rgb(var(--primary-light))',
				},
				secondary: {
					DEFAULT: 'rgb(var(--secondary))',
					dark: 'rgb(var(--secondary-dark))',
					light: 'rgb(var(--secondary-light))',
				},
				accent: {
					DEFAULT: 'rgb(var(--accent))',
					dark: 'rgb(var(--accent-dark))',
					light: 'rgb(var(--accent-light))',
				},
				white: 'rgb(var(--white))',
				'light-gray': 'rgb(var(--light-gray))',
				'medium-gray': 'rgb(var(--medium-gray))',
				gray: 'rgb(var(--gray))',
				'dark-gray': 'rgb(var(--dark-gray))',
				'near-black': 'rgb(var(--near-black))',
				black: 'rgb(var(--black))',
				success: 'rgb(var(--success))',
				warning: 'rgb(var(--warning))',
				error: 'rgb(var(--error))',
				info: 'rgb(var(--info))',
				
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			fontSize: {
				'display': ['3rem', { lineHeight: '1.1' }],
				'h1': ['2.25rem', { lineHeight: '1.2' }],
				'h2': ['1.875rem', { lineHeight: '1.2' }],
				'h3': ['1.5rem', { lineHeight: '1.2' }],
				'h4': ['1.25rem', { lineHeight: '1.2' }],
				'h5': ['1.125rem', { lineHeight: '1.2' }],
				'h6': ['1rem', { lineHeight: '1.2' }],
				'body': ['1rem', { lineHeight: '1.6' }],
				'small': ['0.875rem', { lineHeight: '1.4' }],
				'xs': ['0.75rem', { lineHeight: '1.4' }],
			},
			animation: {
				'fade-in': 'fadeIn 0.3s ease-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'slide-in-right': 'slideInRight 0.3s ease-out',
				'slide-out-right': 'slideOutRight 0.3s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
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
				}
			}
		}
	},
	plugins: [
		require('tailwindcss-animate')
	]
} satisfies Config;
