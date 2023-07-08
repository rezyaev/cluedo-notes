/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			minWidth: {
				24: "6rem",
				32: "8rem",
			},
		},
	},
	plugins: [],
};
