import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Form from '../Form';

function Dashboard() {
  
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

 
  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <div className=''>
        <Form />
      </div>
    </div>
  );
}

export default Dashboard;
