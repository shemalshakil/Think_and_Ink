import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from '../AppState';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate= useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) navigate("/");
  }, [])
  const context = useContext(StateContext);
  const { signup, loading } = context;
  const [creds, setCreds] = useState({ name: "", email: "", location: "", password: "", repeat: "", profileImage: "" });

  const [profileImage, setProfileImage] = useState("");

  const onProfileImageUpload = (e) => {
    setCreds({ ...creds, profileImage: e.target.files[0] });
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    document.querySelector(".profile-image-preview").style.display = "block";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", creds.name);
    formData.append("email", creds.email);
    formData.append("location", creds.location);
    formData.append("password", creds.password);
    formData.append("repeat", creds.repeat);
    formData.append("profileImage", creds.profileImage);
    signup(formData);
  }

  return (
    <>
      <div className="general-block">
        <Link to='/' className="back">Back To Home</Link>
        <div className="blog-title"><h1>Login To Your Account!</h1></div>
      </div>
      <form className="signup-card" onSubmit={onSubmit}>
        <label>Name</label>
        <input type="text" placeholder='Enter Name' onChange={(e) => setCreds({ ...creds, name: e.target.value })} />
        <label>Email</label>
        <input type="email" placeholder='Enter Email' onChange={(e) => setCreds({ ...creds, email: e.target.value })} />
        <label>Location</label>
        <input type="text" placeholder='Enter Location' onChange={(e) => setCreds({ ...creds, location: e.target.value })} />
        <label>Password</label>
        <input type="password" placeholder='Create Password' onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
        <label>Repeat Password</label>
        <input type="password" placeholder='Repeat Password' onChange={(e) => setCreds({ ...creds, repeat: e.target.value })} />
        <img src={profileImage} alt="" className='profile-image-preview' />
        <label className='profile-image-label' htmlFor='profileImage'>Upload Profile Image</label>
        <input type="file" className='profile-image-input' id='profileImage' onChange={onProfileImageUpload} />
        <div className="terms">
          <strong>Terms and Conditions :</strong>
          <p><b>1.</b> You Should provide all valid details in this signup form.</p>
          <p><b>2.</b> Our users for now don't have any option to edit their details, so enter wisely.</p>
          <p><b>3.</b> Any discrepency in data should be brought in notice of the <b>Admin</b> immediately.</p>
          <p><b>4.</b> We are not responsible for any kind of data uploaded by Our Users.</p>
          <p><b>5.</b> <b>By Creating an Account</b> here you Agree to all the above Terms and Conditions.</p>
        </div>
        <button disabled={loading} className={`btn signup-card-btn ${loading && 'disabled'}`}>Create An Account</button>
      </form>
    </>
  )
}

export default Signup;