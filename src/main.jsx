import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/Route.jsx'
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProviders from './Pages/Components/Providers/AuthProviders.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProviders>
    <RouterProvider router={router} />
    </AuthProviders>
    </React.StrictMode>
 
);