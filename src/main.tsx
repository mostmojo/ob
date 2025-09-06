import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Disclosure from './pages/Disclosure'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclosure" element={<Disclosure />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 