/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./application/**/*.{html,js,ts,vue}",
    "./docs/**/*.{md,html,js,ts,vue}",
    "./docs/.vitepress/**/*.{md,html,js,ts,vue}",
  ],
  options: {
    safelist: ["html", "body"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
