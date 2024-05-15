import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/stores/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/stores/userStore";

const Login = () => {
  const [login, { isError, error, isLoading, isSuccess, data: user }] =
    useLoginMutation();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ ...formData });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(user);
      dispatch(setUser(user));
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="auth-page">
      <h1>Login</h1>
      {isError && <p className="error">{error.data.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
          type="text"
          placeholder="Username"
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          placeholder="Password"
        />
        <button disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
      </form>
      <p className="bottom-text">
        Don't have an account? <Link to="/auth/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
