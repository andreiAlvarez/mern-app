import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const { name, email, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      await axios.post(
        "/auth/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.history.push("/login");
    } catch (error) {
      setData({ ...data, error: error.response.data.error });
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h4>Create an account</h4>
      <div>
        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              className="form-input"
              type="name"
              name="name"
              value={name}
              onChange={handleChange}
            ></input>
          </div>
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
              Register
            </button>
          </div>
          <p className="text-center">
            Already a user? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
