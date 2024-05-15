import React, { useEffect, useRef, useState } from "react";
import DynamicTextArea from "../components/DynamicTextArea";
import { useCreateBlogMutation } from "../redux/stores/apiSlice";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef();

  const navigate = useNavigate()

  const [createBlog, { isSuccess }] = useCreateBlogMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    await createBlog(formData)
  };

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess])

  return (
    <div className="create-blog-page">
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
        <button>Post Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
