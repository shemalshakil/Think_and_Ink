import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StateContext } from '../AppState';

const Login = () => {
  const navigate= useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) navigate("/");
  }, [])
  const context = useContext(StateContext);
  const { login, loading } = context;
  const [creds, setCreds] = useState({ email: "", password: "" });
  return (
    <>
      <div className="general-block">
        <Link to='/' className="back">Back To Home</Link>
        <div className="blog-title"><h1>Login To Your Account!</h1></div>
      </div>
      <form className="login-card" onSubmit={(e) => { e.preventDefault(); login(creds); }}>
        <label>Email</label>
        <input type="email" placeholder='Enter Email' required onChange={(e) => setCreds({ ...creds, email: e.target.value })} />
        <label>Password</label>
        <input type="password" placeholder='Enter Password' required onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
        <button type='submit' disabled={loading} className={`btn login-card-btn ${loading && 'disabled'}`}>LOGIN</button>
      </form>
    </>
  )
}

export default Login;