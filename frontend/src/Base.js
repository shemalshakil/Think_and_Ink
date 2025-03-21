import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import BlogPage from './components/Blog';
import User from './components/User';
import Login from './components/Login';
import Signup from './components/Signup';
import Compose from './components/Compose';
import AppState from './AppState';
import Alert from './components/Alert';

const Base = () => {
  return (
    <Router>
      <AppState>
        <Navbar />
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog/:id" element={<BlogPage />} />
          <Route exact path="/compose" element={<Compose />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </AppState>
    </Router>
  )
}

export default Base;