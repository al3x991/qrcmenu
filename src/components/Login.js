// src/components/Login.js
import { useState } from 'react';
import { signInWithEmailAndPassword, auth } from '../config/firebase';
import Image from "../logo.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
         <div className="logo">
      <LazyLoadImage src={Image}
        width={100} height={100}
        alt="Image Alt"
      />
     </div>
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-container">
        <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <label>Email</label>
            </div>
            <div className="input-container">
          
            <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label>Password</label>
            </div>
        
        <div className="input-container">
        <button onClick={handleLogin}>Login</button>
        
        </div>
       
      </div>
    </div>
  );
}

export default Login;