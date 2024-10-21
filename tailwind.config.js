/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "linear-gradient-bg":"linear-gradient(315deg, rgba(255,255,255,0), rgba(255,255,255,0.2))",
        "purple-blue":"linear-gradient(10deg,rgba(119,23,179,1) 0%,rgba(233,9,202,1) 100%)",
        "blue-blue":"linear-gradient(10deg,rgba(188,238,235,1) 0%,rgba(83,120,217,1) 100%)",

      },
      boxShadow:{
        upperShadow:"0px -1px 2px rgba(0,0,0,0.25)"
      },
    },
  },
  plugins: [],
}

