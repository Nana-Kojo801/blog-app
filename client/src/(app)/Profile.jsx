import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/stores/apiSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const fileRef = useRef();
  const formRef = useRef()
  const imageRef = useRef()
  const [url, setUrl] = useState(null)

  const navigate = useNavigate()

  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    await updateUser(formData)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUrl(URL.createObjectURL(file))
  }

  useEffect(() => {
    if (user !== null) {
      if (!user?.image) return
      setUrl(`http://localhost:3000/${user?.image}`)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess])

  return (
    <div className="profile-page">
      <div onClick={() => fileRef.current.click()} className="image-area">
      <div style={{ display: url === null ? "grid" : "none" }} className="image-placeholder">{user?.username.charAt(0)}</div>
      <img style={{ display: url !== null ? "block" : "none"}} ref={imageRef} src={url} />
          
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" defaultValue={user?.username} />
        <input name="password" type="password" placeholder="Password" defaultValue={user?.password} />
        <input name="file" ref={fileRef} onChange={handleFileChange} type="file" style={{ display: "none" }} />
        <button disabled={isLoading}>{ isLoading ? "Updating..." : "Update profile"}</button>
      </form>
    </div>
  );
};

export default Profile;
