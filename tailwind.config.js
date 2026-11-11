/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          green: '#00a884',
          'dark-green': '#008069',
          light: '#efeae2',
          'chat-bg': '#f0f2f5',
          'incoming': '#ffffff',
          'outgoing': '#d9fdd3',
        },
      },
    },
  },
  plugins: [],
};
