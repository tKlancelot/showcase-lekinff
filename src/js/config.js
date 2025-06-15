// config.js
let mode = 'PROD';

export const apiUrl = mode === 'DEV' 
  ? 'http://localhost:3000' 
  : 'https://render-showcase-express.onrender.com';