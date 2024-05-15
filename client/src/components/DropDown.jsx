import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/stores/apiSlice";
const DropDown = ({ handle }) => {
  const dropDownRef = useRef();

  const [logout, { isSuccess }] = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    handle()
    await logout()
  }

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess])

  useEffect(() => {
    const mouseDown = (e) => {
      console.log('document was clicked');
      // if (e.target.tagName === "IMG") return
      if (!dropDownRef.current?.contains(e.target)) handle()
    }
    document.addEventListener("mousedown", mouseDown)

    return () => {
      console.log('destroying');
      document.removeEventListener("mousedown", mouseDown);
    };
  }, []);

  return (
    <div ref={dropDownRef} className="drop-down">
      <Link onClick={handle} to="/createBlog">Create Blog</Link>
      <Link onClick={handle} to="/profile">Profile</Link>
      <Link onClick={handleLogout}>Logout</Link>
    </div>
  );
};

export default DropDown;
