import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F3D2E',
                secondary: '#14532D',
                accent: '#F59E0B',
                accentDark: '#D97706',
                light: '#F8FAFC',
                graySoft: '#E5E7EB',
                blueGradientStart: '#1E3A8A',
                blueGradientEnd: '#2563EB',
                // Magazine warm colors
                cream: '#FAF8F4',
                ink: '#1A1612',
                inkSoft: '#3D3530',
                warmGray: '#8C8480',
                border: '#E8E3DC',
                gold: '#C9A96E',
                goldLight: '#E8D5B0',
                terracotta: '#C4704A',
                sage: '#6B8C6B',
            },
            fontFamily: {
                heading: ['var(--font-playfair)', 'serif'],
                body: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
