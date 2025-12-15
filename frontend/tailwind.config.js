// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(220, 10%, 12%)",
                foreground: "hsl(210, 40%, 98%)",
                muted: "hsl(210, 15%, 20%)",
                border: "hsl(210, 10%, 30%)",
                "muted-foreground": "hsl(210, 10%, 60%)",
                destructive: "hsl(0, 70%, 50%)",
            },
        },
    },
    plugins: [],
};
