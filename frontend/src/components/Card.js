import React, { useContext } from 'react';
import { StateContext } from '../AppState';
import { Link } from 'react-router-dom';
import { date, year, month } from "./Utils";

const Card = ({ blog, isAuthor }) => {
  const context = useContext(StateContext);
  const { deleteBlog } = context;
  var time = blog.date.slice(0,10);
  time = new Date(time);

  return (
    <div className='card'>
      <img src={`data:${blog.coverImage.contentType};base64, ${blog.coverImage.data}`} alt='' className='card-image' />
      <div className='card-category'>{blog.category}</div>
      <Link to={`/blog/${blog._id}`} className='card-title'>{blog.title}</Link>
      <div className="card-date">{date(time)+" "+month(time)+" "+year(time)}</div>
      <div className='card-description' dangerouslySetInnerHTML={{__html:blog.content.replace( /(<([^>]+)>)/ig, '')}}></div>
      <div className="card-footer">
        <div className='card-profile-info'>
          <img src={`data:${blog.UserInfo[0].profileImage.contentType};base64, ${blog.UserInfo[0].profileImage.data}`} alt='' className='card-profile-image' />
          <span className="card-profile-name">{blog.UserInfo[0].name}</span>
        </div>
        {isAuthor&&<div className="card-option">
          <i className="btn btn-delete fa-solid fa-trash-can" onClick={()=>deleteBlog(blog._id)}></i>
        </div>}
      </div>
    </div>
  )
}

export default Card;