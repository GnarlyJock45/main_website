// Azwa | Frontend config
//
// BACKEND_URL is where the Flask API lives.
//   - Local dev:  http://localhost:5000
//   - Deployed:   https://azwa-api.onrender.com  (or your Render URL)
//
// The value below auto-selects: local when opened via localhost, else the
// production URL. Override at any time by editing this file directly.
const isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(location.hostname);

export const BACKEND_URL = isLocalhost
  ? 'http://localhost:5000'
  : 'https://azwa-api.onrender.com';
