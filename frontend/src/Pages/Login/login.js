import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import "./login.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate('')

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      console.log("result at login page",response.result.accessToken);
      setItem(KEY_ACCESS_TOKEN,response.result.accessToken)
      navigate('/')
    } 
    
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input type="submit" className="submit" onClick={handleSubmit} />
        </form>
        <p>--or--</p>
        <Link to="/signup">
          <p>Create an account!</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
