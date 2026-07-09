import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initPixel } from '@/lib/tiktokPixel'

// Identify the visitor as early as possible so the pageview event carries PII.
initPixel();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)