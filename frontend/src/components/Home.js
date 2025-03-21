import React, { useContext, useState } from 'react';
import { StateContext } from '../AppState';
import Card from './Card';
import Header from "./Header";
import Spinner from './Spinner';

const Home = () => {
  const context = useContext(StateContext);
  const { blogs, user, getBlogs, myBlogs } = context;
  const [bg1, setBg1] = useState('active');
  const [bg2, setBg2] = useState('');
  return (
    <>
      <Header />
      <div className="heading">
        {!user ? <div className="heading-notlogged">Browse Blogs</div>
          : <><div className={`heading-tab-logged ${bg1}`} onClick={()=>{getBlogs(); setBg2(""); setBg1("active")}}>Browse Blogs</div>
            <div className={`heading-tab-logged ${bg2}`} onClick={()=>{myBlogs(); setBg1(""); setBg2("active")}}>My Blogs</div></>}
      </div>
      <div className="container">
        <div className='cards-container'>
          {!blogs ? <Spinner /> : blogs.length === 0 ? "No Blogs to Show. Try Composing One!" : blogs.map((blog) => { return <Card blog={blog} key={blog._id} isAuthor={user ? user._id === blog.UserInfo[0]._id : false} /> })}
        </div>
      </div>
    </>
  )
}

export default Home;