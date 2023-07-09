/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				"table-cell": "calc((100% - 6rem) / 7)",
			},
			minWidth: {
				24: "6rem",
				32: "8rem",
			},
		},
	},
	plugins: [],
};
