/**
 * Tailwind CSS v4 JavaScript Configuration File
 * 
 * PURPOSE:
 * This file maps standard CSS variables (like `var(--bg-primary)`) to Tailwind theme tokens.
 * By mapping them here, we allow Tailwind to generate utility classes (e.g. `bg-bg-primary`, `bg-bg-card`, etc.)
 * while keeping index.css strictly composed of standard CSS :root/class variables.
 * 
 * WHY USE THIS CONFIG:
 * In Tailwind CSS v4, custom theme variables are normally declared inside an `@theme` block in CSS.
 * However, default CSS linters in editors like VS Code flag `@theme` as an "Unknown at-rule" warning.
 * Using this JS config file completely avoids having `@theme` in index.css, keeping your CSS file clean and warning-free.
 * 
 * HOW IT WORKS AT RUNTIME:
 * 1. Your CSS file (index.css) defines the color values (e.g., `--bg-card: #0d0d63` for dark, `--bg-card: #ffffff` for light).
 * 2. This JS config maps those CSS variables to Tailwind colors (e.g. `bg-card` resolves to `var(--bg-card)`).
 * 3. When you use the utility class `bg-bg-card` in React, it uses `var(--bg-card)`, which dynamically updates based on the active theme!
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        'bg-input': 'var(--bg-input)',
        'bg-badge': 'var(--bg-badge)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-color': 'var(--border-color)',
      },
    },
  },
  plugins: [],
}
