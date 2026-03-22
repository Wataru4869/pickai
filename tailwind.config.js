/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#1d1d1f",
        "accent-pale": "#f5f5f7",
      },
      fontFamily: {
        sans: ['"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', '"Yu Gothic"', '"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
