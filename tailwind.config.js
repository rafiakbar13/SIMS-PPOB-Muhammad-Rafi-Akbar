/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        saldo: "url('/src/assets/Background Saldo.png')",
      },
    },
  },
  plugins: [],
};
