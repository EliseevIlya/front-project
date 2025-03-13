import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import Headers from './component/Headers/headers.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Headers />
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)