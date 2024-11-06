import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppRouter from './AppRouter.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

console.log('Rendering main.jsx');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </React.StrictMode>,
)