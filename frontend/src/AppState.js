import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AUTH_URL = 'http://localhost:5000/api/auth';
export const BLOG_URL = 'http://localhost:5000/api/blog';

export const StateContext = createContext();

const AppState = (props) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [alert, setAlert] = useState({ show: false, status: "", message: "" });

  const [blogs, setBlogs] = useState(null);

  const [blog, setBlog] = useState({_id:""});

  const [loading, setLoading] = useState(false);

  const login = async (creds) => {
    try {
      setLoading(true);
      const response = await axios.post(`${AUTH_URL}/login`, creds);
      if (response.data.success) {
        localStorage.setItem("token", response.data.authToken);
        setUser(response.data.user);
        setAlert({ show: true, status: "Success!", message: response.data.message + " Please Wait..." })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false);
          navigate("/");
        }, 2000);
      } else {
        setAlert({ show: true, status: "Error!", message: response.data.message })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      setAlert({ show: true, status: "Error!", message: error.message })
      setTimeout(() => {
        setAlert({ show: false, status: "", message: "" });
        setLoading(false);
      }, 3000);
    }
  }

  const signup = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${AUTH_URL}/signup`, formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.authToken);
        setUser(response.data.user);
        setAlert({ show: true, status: "Success!", message: response.data.message + " Please Wait..." })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
          navigate("/");
        }, 2000);
      } else {
        setAlert({ show: true, status: "Error!", message: response.data.message })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
        }, 3000);
      }
    } catch (error) {
      setAlert({ show: true, status: "Error!", message: error.message })
      setTimeout(() => {
        setAlert({ show: false, status: "", message: "" });
        setLoading(false);
      }, 3000);
    }
  }

  const getUser = async () => {
    if (localStorage.getItem("token")) {
      const response = await axios.post(`${AUTH_URL}/getuser`, {}, { headers: { "token": localStorage.getItem("token") } });
      if (response.data.success) {
        setUser(response.data.user);
      }
    }
  }

  const getBlogs = async () => {
    setBlogs(null);
    const response = await axios.post(`${BLOG_URL}/`);
    if (response.data.success) {
      setBlogs(response.data.blogs.reverse());
    }
  }

  const composeBlog = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BLOG_URL}/compose`, formData, { headers: { "token": localStorage.getItem("token") } });
      if (response.data.success) {
        setBlogs(blogs.concat(response.data.blog));
        setAlert({ show: true, status: "Success!", message: response.data.message + " Please Wait..." })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
          navigate("/");
        }, 2000);
      } else {
        setAlert({ show: true, status: "Error!", message: response.data.message })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
        }, 3000);
      }
    } catch (error) {
      setAlert({ show: true, status: "Error!", message: error.message })
      setTimeout(() => {
        setAlert({ show: false, status: "", message: "" });
        setLoading(false);
      }, 3000);
    }
  }

  const deleteBlog = async (id) => {
    try {
      setLoading(true)
      const response = await axios.post(`${BLOG_URL}/delete/${id}`, {}, { headers: { "token": localStorage.getItem("token") } });
      if (response.data.success) {
        setBlogs(blogs.filter((blog) => { return blog._id !== response.data.blog._id }).reverse());
        setAlert({ show: true, status: "Success!", message: response.data.message + " Please Wait..." })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
          navigate("/");
        }, 2000);
      } else {
        setAlert({ show: true, status: "Error!", message: response.data.message })
        setTimeout(() => {
          setAlert({ show: false, status: "", message: "" });
          setLoading(false)
        }, 3000);
      }

    } catch (error) {
      setAlert({ show: true, status: "Error!", message: error.message })
      setTimeout(() => {
        setAlert({ show: false, status: "", message: "" });
        setLoading(false);
      }, 3000);
    }
  }

  const getBlog = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BLOG_URL}/blog/${id}`);
      if (response.data.success) {
        setBlog(response.data.blog[0]);
      }
    } catch (error) {
      setAlert({ show: true, status: "Error!", message: error.message })
      setTimeout(() => {
        setAlert({ show: false, status: "", message: "" });
        setLoading(false);
      }, 3000);
    }
  }

  const myBlogs = async () => {
    setBlogs(null);
    const response = await axios.post(`${BLOG_URL}/myblogs`, { id: user._id }, { headers: { "token": localStorage.getItem("token") } })
    if (response.data.success) {
      setBlogs(response.data.blogs.reverse());
    }
  }

  return (
    <StateContext.Provider value={{
      setAlert,
      blogs,
      user,
      setUser,
      login,
      signup,
      getBlogs,
      getUser,
      composeBlog,
      deleteBlog,
      blog,
      getBlog,
      myBlogs,
      alert,
      loading,
    }} >
      {props.children}
    </StateContext.Provider>
  )
}

export default AppState;