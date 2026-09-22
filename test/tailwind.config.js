/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./src/index.css"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				page: "#000000",
				surface: "#111111",
				text: "#ffffff",
				accent: "#f5f5f5",
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
				display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
};
