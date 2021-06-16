import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
  });

  const { email, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      props.history.push("/");
    } catch (error) {
      console.log(error);
      setData({ ...data, error: error.response.data.error });
    }
  };

  return (
    <div className="form">
      <h4>Log into your account</h4>
      <div>
        <form>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            ></input>
          </div>
          {error ? <p>{error}</p> : null}
          <div>
            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <p className="text-center">
            Not a user? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
