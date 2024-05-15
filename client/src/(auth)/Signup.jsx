import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/stores/apiSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate()
  const [signup, { isLoading, isError, error, isSuccess }] = useSignupMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ ...formData });
  };

  useEffect(() => {
    if (isSuccess) navigate("/auth/login")
  }, [isSuccess])

  return (
    <div className="auth-page">
      <h1>Sign Up</h1>
      {isError && <p className="error">{error.data.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm password"
        />
        <button disabled={isLoading}>{isLoading ? "Loading..." : "Sign up"}</button>
      </form>
      <p className="bottom-text">
        Already have an account? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
