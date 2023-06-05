import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// axios
console.log(

"API_URL", import.meta.env.VITE_API_BASE
)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.request.use(
//   config => {
//     if (!config.headers.Authorization) {
//       const token = JSON.parse(localStorage.getItem("token"));
// 
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
// 
//     return config;
//   },
//   error => Promise.reject(error)
// );


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </React.StrictMode>,
)
