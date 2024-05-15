import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${blog._id}`)} className="blog">
      <div className="image-area">
        <img src={`http://localhost:3000/${blog.cover}`} />
      </div>
      <div className="content">
        <p className="header">{blog.title}</p>
        <p className="content-text">{blog.content}</p>
      </div>
      <p className="author-date">
        {blog.user.username} {new Date(blog.createdAt).toDateString()}
      </p>
    </div>
  );
};

export default Blog;
