/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                customGray: {
                    light: '#2e3039',
                    base: '#eeeeee',
                    dark: '#1f2028',
                },
            },
        },
    },
    darkMode: 'class',
};
