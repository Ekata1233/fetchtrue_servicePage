import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ServiceProvider } from './Components/context/ServiceContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServiceProvider>
     
        <App />
    </ServiceProvider>
  </StrictMode>
);
