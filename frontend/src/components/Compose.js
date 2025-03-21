import React, { useState, useContext } from 'react';
import { StateContext } from '../AppState';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { modules, formats } from "./Utils";

const Compose = () => {

  const [newBlog, setNewBlog] = useState({ title: "", category: "General", content: "", coverImage: "" });

  const context = useContext(StateContext);
  const { composeBlog, loading } = context;

  const [coverImage, setCoverImage] = useState("");

  const onCoverImageUpload = (e) => {
    setNewBlog({ ...newBlog, coverImage: e.target.files[0] });
    setCoverImage(URL.createObjectURL(e.target.files[0]));
    document.querySelector(".cover-image-preview").style.display = "block";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("category", newBlog.category);
    formData.append("content", newBlog.content);
    formData.append("coverImage", newBlog.coverImage);
    composeBlog(formData);
  }

  return (
    <>
      <div className="general-block">
        <Link to='/' className="back">Back To Home</Link>
        <div className="blog-title"><h1>Compose a New Blog!</h1></div>
      </div>
      <form className="compose-card" onSubmit={onSubmit}>
        <label>Title</label>
        <input type="text" placeholder='Enter Title' onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
        <label>Category</label>
        <select className='compose-category' onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}>
          <option value="General">General</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Daily Updates">Daily Updates</option>
        </select>
        <label>Blog Content</label>
        <ReactQuill theme="snow" value={newBlog.content} onChange={value => setNewBlog({ ...newBlog, content: value })} modules={modules} formats={formats} placeholder={"Start typing..."} />
        <img src={coverImage} alt="" className='cover-image-preview' />
        <label className='cover-image-label' htmlFor='coverImage'>Upload Cover Image</label>
        <input type="file" className='cover-image-input' id='coverImage' onChange={onCoverImageUpload} />
        <div className="terms">
          <strong>Terms and Conditions :</strong>
          <p><b>1.</b> Verify that this Blog don't contain any Sensetive or Private Information.</p>
          <p><b>2.</b> Any section of this blog should not go against any community.</p>
          <p><b>3.</b> If that happens we are not responsible for the Consequences.</p>
          <p><b>4.</b> <b>By Publishing this Blog</b> you Agree to all the above Terms and Conditions.</p>
        </div>
        <div className="compose-card-foot">
          <button type='reset' className='btn compose-card-btn' onClick={() => { setCoverImage(""); document.querySelector(".cover-image-preview").style.display = "none"; setNewBlog({ ...newBlog, content: "" }) }}>Discard</button>
          <button type='submit' disabled={loading} className={`btn compose-card-btn ${loading && 'disabled'}`}>Publish</button>
        </div>
      </form>
    </>
  )
}

export default Compose;