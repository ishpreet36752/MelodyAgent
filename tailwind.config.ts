
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
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			mood: {
    				happy: '#FFD166',
    				sad: '#4D7EA8',
    				energetic: '#E63946',
    				calm: '#A8DADC',
    				focus: '#457B9D'
    			},
    			surface: {
    				light: 'rgba(255, 255, 255, 0.8)',
    				dark: 'rgba(28, 28, 30, 0.8)'
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
    			'fade-in': {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			'fade-out': {
    				'0%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'slide-up': {
    				'0%': {
    					transform: 'translateY(20px)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			'slide-down': {
    				'0%': {
    					transform: 'translateY(-20px)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			'scale-in': {
    				'0%': {
    					transform: 'scale(0.95)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'scale(1)',
    					opacity: '1'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					transform: 'scale(1)'
    				},
    				'50%': {
    					transform: 'scale(1.05)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			ripple: {
    				'0%': {
    					transform: 'scale(0)',
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'scale(2.5)',
    					opacity: '0'
    				}
    			},
    			wave: {
    				'0%': {
    					transform: 'translateY(0)'
    				},
    				'25%': {
    					transform: 'translateY(-15%)'
    				},
    				'50%': {
    					transform: 'translateY(0)'
    				},
    				'75%': {
    					transform: 'translateY(15%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			'star-movement-bottom': {
    				'0%': {
    					transform: 'translate(0%, 0%)',
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translate(-100%, 0%)',
    					opacity: '0'
    				}
    			},
    			'star-movement-top': {
    				'0%': {
    					transform: 'translate(0%, 0%)',
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translate(100%, 0%)',
    					opacity: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.3s ease-out',
    			'fade-out': 'fade-out 0.3s ease-out',
    			'slide-up': 'slide-up 0.4s ease-out',
    			'slide-down': 'slide-down 0.4s ease-out',
    			'scale-in': 'scale-in 0.3s ease-out',
    			'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
    			float: 'float 3s ease-in-out infinite',
    			ripple: 'ripple 1s linear',
    			wave: 'wave 2s ease-in-out infinite',
    			'star-movement-bottom': 'star-movement-bottom 6s linear infinite alternate',
    			'star-movement-top': 'star-movement-top 6s linear infinite alternate'
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;