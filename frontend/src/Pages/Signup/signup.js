import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import './signup.scss'

function Signup() {

  const [name,setName]=useState("")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      if(result!==undefined){
        console.log('signup result at frontend',result);
        navigate('/login')
      }
      
    } 
    
    catch (error) {
      console.log('signup error at frontend',error);
    }
  }
  return (
    <div className="signup">
      <div className="signup-box">
        <h1 className="heading">Signup</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          
          <input type="text" id="name" className="name" onChange={(e)=>setName(e.target.value)}/>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="email" onChange={(e)=>setEmail(e.target.value)}/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="password" onChange={(e)=>setPassword(e.target.value)}/>
          <input type="submit" className="submit" />
        </form>
        <p>--or--</p>
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
