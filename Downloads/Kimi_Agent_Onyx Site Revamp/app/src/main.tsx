import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(240 10% 8%)',
          border: '1px solid hsl(240 3.7% 20%)',
          color: 'hsl(0 0% 98%)',
        },
      }}
    />
  </StrictMode>,
)
