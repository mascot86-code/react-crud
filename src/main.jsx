import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SeminarsContextProvider} from './context/seminars-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SeminarsContextProvider>
      <App />
    </SeminarsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
