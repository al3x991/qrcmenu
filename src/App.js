import React from 'react';
import { Outlet, Route, Routes, Link, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import PDFViewer from './PDFViewer';
import Dashboard from './Form';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Form from './Form'

function App() {
  const user = useAuth();
  const location = useLocation();

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      {user ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <Dashboard />
        </div>
      ) : location.pathname !== '/menu' ? ( // Hide login link on the /menu route
        <Login />
      ) : null}
      <Routes>
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Form />} />}
        />
        <Route path="/menu" element={<PDFViewer />} />
        <Route path="/edit-menu" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
