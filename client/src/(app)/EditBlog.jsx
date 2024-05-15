import React, { useEffect, useRef, useState } from "react";
import DynamicTextArea from "../components/DynamicTextArea";
import { useEditBlogMutation, useGetBlogQuery } from "../redux/stores/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading: isLoadingBlog,
    isSuccess: isGetBlogSuccess,
  } = useGetBlogQuery({ id });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef();

  const navigate = useNavigate();

  const [editBlog, { isSuccess: isEditSuccess }] = useEditBlogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    formData.set("postId", id)
    await editBlog(formData);
  };

  useEffect(() => {
    if (isGetBlogSuccess) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [isGetBlogSuccess]);

  useEffect(() => {
    if (isEditSuccess) navigate(`/blog/${id}`);
  }, [isEditSuccess]);

  if (isLoadingBlog) return <p>Loading blog...</p>;

  return (
    <div className="edit-blog-page">
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Blog Title..."
        />
        <input name="file" type="file" />
        <DynamicTextArea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content..."
        />
        <button>Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
