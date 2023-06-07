import { useState } from 'react'
import { createTheme } from '@mui/material/styles';
import Signin from './pages/Signin';
import { Route, Routes, useRoutes } from 'react-router-dom';
import SignUp from './pages/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import ProfileAddress from './pages/profile/ProfileAddress';
import ProfileOrder from './pages/profile/ProfileOrder';
import ProfileMain from './pages/profile/ProfileMain';
import { ProtectedManagerRoute } from './components/ProtectedManagerRoute';
import OrderManagement from './pages/OrderManagement';


const defaultTheme = createTheme();

function App() {

  return (
    <AuthProvider>

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute><ProfileMain /></ProtectedRoute>
          } />
        <Route
          path="/address"
          element={
            <ProtectedRoute><ProfileAddress /></ProtectedRoute>
          } />
        <Route
          path="/order"
          element={
            <ProtectedRoute><ProfileOrder /></ProtectedRoute>
          } />
        <Route
          path="/orders"
          element={
            <ProtectedManagerRoute><OrderManagement /></ProtectedManagerRoute>
          } />
      </Routes>
    </AuthProvider>
  )
}

export default App
