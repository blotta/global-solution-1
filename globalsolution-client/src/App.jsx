import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createTheme } from '@mui/material/styles';
import Signin from './pages/Signin';
import { Route, Routes, useRoutes } from 'react-router-dom';
import TestLoggedIn from './pages/TestLoggedin';
import SignUp from './pages/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';


const defaultTheme = createTheme();

function App() {
  // const routes = useRoutes([
  //   {
  //     path: "/signin",
  //     element: <Signin />
  //   },
  //   {
  //     path: "/signup",
  //     element: <SignUp />
  //   },
  //   {
  //     path: "/",
  //     element: <TestLoggedIn />
  //   }
  // ])
  // return routes;


  return (
    <AuthProvider>

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute><TestLoggedIn /></ProtectedRoute>
          } />
      </Routes>
    </AuthProvider>
  )
}

export default App
