// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin + '/api'  // Use same domain in production
  : 'http://localhost:3000/api';     // Use localhost in development

export default API_BASE_URL;
