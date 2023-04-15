
import React, { useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import '../navbar/Navbar.scss'
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";

function Navbar() {
  const navigate=useNavigate()
  // const dispatch=useDispatch()
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile)
  // console.log(myProfile,'my profile on navbar');

  async function logOut(){
    try {
      // dispatch(setLoading(true))
      await axiosClient.get('/auth/logout')
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')
      // dispatch(setLoading(false))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Navbar">
      
      <div className="container">
        <h2 className="banner hover-link" onClick={()=>{navigate('/')}}>Social Media</h2>

        <div className="right-side">
          <div className="Profile hover-link" onClick={()=>{navigate(`/profile/:${myProfile?._id}`)}}>
            <Avatar src={myProfile?.avatar?.url}/>
          </div>
          <div className="logout hover-link">
          <i className="fa-solid fa-right-from-bracket" onClick={logOut}></i>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Navbar;
