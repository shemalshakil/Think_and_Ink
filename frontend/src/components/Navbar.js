import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from "../AppState";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const context = useContext(StateContext);
  const { getUser, getBlogs, user } = context;
  const navigate = useNavigate();
  const [navBarBG, setNavBarBG] = useState(false);
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) setNavBarBG(true)
      else setNavBarBG(false)
    });
    getBlogs(); 
    getUser();
  }, [])

  return (
    <div className={navBarBG ? 'nav-container invert' : 'nav-container'}>
      <div className='navbar container'>
        <div onClick={()=>navigate("/")} className={navBarBG ? 'logo invertText' : 'logo'}><span>Writing</span> Kida</div>
        <div className='left'>
          {!user?<><Link to='/login' className='btn'>LOGIN</Link>
          <Link to='/signup' className='btn'>SIGNUP</Link></>
          :<><Link to='/compose' className='btn'>COMPOSE</Link>
          <Link to='/user' className='user-info'>
            <i className={`fa-solid fa-user ${navBarBG&&'invertText'}`}></i>
          </Link></>}
        </div>
      </div>
    </div>
  )
}

export default Navbar;