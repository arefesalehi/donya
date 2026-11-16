/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports=withMT(
  {
    content: [
      './components/**/*.{html,js}',
      './pages/**/*.{html,js}',
      './index.html',
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
      "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx}"
      
    ],
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        // 'purple': '#7443ff',
        "gray":'f2f6fc',
        'lightPurple':'rgb(116,67,255);'
        
       
    },},
  
    plugins: [
      require('flowbite/plugin')
    ],
    
  }
)  



