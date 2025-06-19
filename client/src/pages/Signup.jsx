import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Signup.css";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method:'POST',
        headers:{
            "Content-Type":'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
      });
      const data = await res.json();
      if(data.message === 'User already exists')
      {
        alert('User already exists');
      }
      else 
      {
      alert("Registration successful");
      navigate('/login');
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
       <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p className="redirect">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}
