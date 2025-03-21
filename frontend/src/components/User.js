import React, { useContext, useEffect } from 'react';
import { StateContext } from '../AppState';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "./Spinner";
import {Buffer} from "buffer";

const User = () => {
    const navigate= useNavigate();
    useEffect(() => {
      if(!localStorage.getItem('token')) navigate("/");
    }, [])
    
    const context = useContext(StateContext);
    const { user, setUser, setAlert, setLoading} = context;
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/");
        setAlert({ show: true, status: "Success!", message: "Logged out Successfully!" })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false);
        }, 2000);
    }

    return (
        <>
            <div className="general-block">
                <Link to='/' className="back">Back To Home</Link>
                <div className="blog-title"><h1>Your Account!</h1></div>
            </div>
            {!user?<Spinner/>:<><div className="user-card">
                <img src={`data:${user.profileImage.contentType};base64, ${Buffer.from(user.profileImage.data).toString('base64')}`} alt="" className='user-card-image' />
                <table>
                    <tr>
                        <td className='label'><strong>Name</strong></td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td className='label'><strong>Email</strong></td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td className='label'><strong>Location</strong></td>
                        <td>{user.location}</td>
                    </tr>
                </table>
            </div>
            <div className="user-card logout">
                <button className='btn user-card-btn' onClick={logout}>LOGOUT</button>
            </div></>}
        </>
    )
}

export default User;