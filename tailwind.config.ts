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
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // shadcn tokens (keep)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // legacy rgb tokens (kept for compatibility)
        primary: {
          DEFAULT: "rgb(var(--primary))",
          dark: "rgb(var(--primary-dark))",
          light: "rgb(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          dark: "rgb(var(--secondary-dark))",
          light: "rgb(var(--secondary-light))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          dark: "rgb(var(--accent-dark))",
          light: "rgb(var(--accent-light))",
        },

        // neutrals via vars
        white: "rgb(var(--white))",
        "light-gray": "rgb(var(--light-gray))",
        "medium-gray": "rgb(var(--medium-gray))",
        gray: "rgb(var(--gray))",
        "dark-gray": "rgb(var(--dark-gray))",
        "near-black": "rgb(var(--near-black))",
        black: "rgb(var(--brand-black))",

        // status
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        error: "rgb(var(--error))",
        info: "rgb(var(--info))",

        // shadcn extras (keep)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // Baynounah brand via CSS vars (no hex)
        brand: {
          gold: "rgb(var(--brand-gold))",
          black: "rgb(var(--brand-black))",
        },
        heritage: {
          red: "rgb(var(--heritage-red))",
          green: "rgb(var(--heritage-green))",
        },
        neutral: {
          white: "rgb(var(--white))",
          silver: "rgb(var(--neutral-silver))",
        },

        // New semantic mappings for components
        surface: {
          1: "rgb(var(--surface-1))",
          2: "rgb(var(--surface-2))",
        },
        text: {
          strong: "rgb(var(--text-strong))",
          muted: "rgb(var(--text-muted))",
        },
        link: {
          DEFAULT: "rgb(var(--link))",
          hover: "rgb(var(--link-hover))",
        },
        separator: "rgb(var(--separator))",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },

      fontSize: {
        display: ["3rem", { lineHeight: "1.1" }],
        h1: ["2.25rem", { lineHeight: "1.2" }],
        h2: ["1.875rem", { lineHeight: "1.2" }], // section titles baseline
        h3: ["1.5rem", { lineHeight: "1.2" }],
        h4: ["1.25rem", { lineHeight: "1.2" }],
        h5: ["1.125rem", { lineHeight: "1.2" }],
        h6: ["1rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.4" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
      },

      letterSpacing: {
        tightest: "-0.02em",
        tighter: "-0.01em",
      },

      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-out-right": "slideOutRight 0.3s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // ADDED - Missing animations for commercial pages
        "rotate-slow": "rotate-slow 30s linear infinite",
        "rotate-slow-reverse": "rotate-slow-reverse 30s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float-delayed 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },

      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { transform: "translateY(20px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
        scaleIn: { from: { transform: "scale(0.95)", opacity: "0" }, to: { transform: "scale(1)", opacity: "1" } },
        slideInRight: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        slideOutRight: { from: { transform: "translateX(0)" }, to: { transform: "translateX(100%)" } },
        // ADDED - Missing keyframes for commercial pages
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "rotate-slow-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" }
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "float-delayed": {
          "0%, 20%": { transform: "translateY(0px)" },
          "60%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
      },

      // ADDED - Custom perspective utilities for 3D transforms
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;