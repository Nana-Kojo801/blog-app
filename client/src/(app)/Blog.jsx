import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeletePostMutation, useGetBlogQuery } from "../redux/stores/apiSlice";
import { useSelector } from "react-redux";

const Blog = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetBlogQuery({ id });
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()

  const [deletePost, { isSuccess }] = useDeletePostMutation()

  const handleDelete = async () => {
    await deletePost({id})
  }

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess])

  if (isLoading) return <p>Loading blog...</p>;

  return (
    <div className="blog-page">
      <div className="header">
        <h1>{blog.title}</h1>
        <p className="data">{new Date(blog.createdAt).toDateString()}</p>
        <p className="author">by {blog.user.username}</p>
        {blog.user.username === user.username && (
          <div className="btn-area">
            <button onClick={() => navigate(`/blog/${id}/edit`)} className="edit">Edit post</button>
            <button onClick={handleDelete} className="delete">Delete post</button>
          </div>
        )}
      </div>
      <div className="image-area">
        <img src={`http://localhost:3000/${blog.cover}`} />
      </div>
      <p className="content">{blog.content}</p>
    </div>
  );
};

export default Blog;
