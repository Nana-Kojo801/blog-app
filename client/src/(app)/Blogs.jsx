import React from "react";
import Blog from "../components/Blog";
import { useGetBlogsQuery } from "../redux/stores/apiSlice";
import { useSearchParams } from "react-router-dom";

const Blogs = () => {
  const searchTerm = useSearchParams()[0].get("search") || "";
  const { data: blogs, isLoading } = useGetBlogsQuery(searchTerm);
  
  return (
    <div className="blogs-page">
      <div className="blog-list">
        {isLoading ? (
          <p>Loading post...</p>
        ) : blogs.length === 0 ? (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.1rem"
            }}
          >
            No blogs found
          </p>
        ) : (
          blogs.map((blog) => <Blog blog={blog} key={blog._id} />)
        )}
      </div>
    </div>
  );
};

export default Blogs;
