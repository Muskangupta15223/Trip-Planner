import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './components/create-trip/index.jsx'
import ViewTrip from './view-trip/tripId/index.jsx'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
   {
   path:'/',
   element:<App/>
   }
   ,
   {
    path:'/create-trip',
    element:<CreateTrip/>
    }
    ,
    {
     path:'/view-trip/:tripId',
     element:<ViewTrip/>
     }
]) 
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Toaster/>
  <RouterProvider router={router} />
  </GoogleOAuthProvider>
   </StrictMode> 
)