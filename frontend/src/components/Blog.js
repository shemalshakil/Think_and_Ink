import React, { useContext, useEffect } from 'react';
import { StateContext } from '../AppState';
import { Link, useParams } from 'react-router-dom';
import Spinner from "./Spinner";

const BlogPage = () => {
  const { id } = useParams();
  const context = useContext(StateContext);
  const { getBlog, blog } = context;
  useEffect(() => {
    getBlog(id);
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <div className="blog">
        {blog._id!==id? <Spinner />:<><div className="blog-container">
          <Link to='/' className="back">Back To Home</Link>
          <div className="blog-title"><h1>{blog.title}</h1></div>
          <div className="blog-body">
            <img src={`data:${blog.coverImage.contentType};base64, ${blog.coverImage.data}`} alt="" className="blog-image" />
            <div className='blog-content' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div className="blog-author-info">
              <img src={`data:${blog.UserInfo[0].profileImage.contentType};base64, ${blog.UserInfo[0].profileImage.data}`} alt="" className='blog-author-image' />
              <span>Author :</span>
              <div className="blog-author name"><strong>{blog.UserInfo[0].name}</strong></div>
              <div className="blog-author-email"><span>Contact : </span><strong>{blog.UserInfo[0].email}</strong></div>
            </div>
            <div className="blog-share">
              <span><strong>Share This Article :</strong></span>
              <div className="blog-share-icons">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
              </div>
            </div>
          </div>
        </div></>}
      </div>
    </>
  )
}

export default BlogPage;