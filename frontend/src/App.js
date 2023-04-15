import "./App.css";
import Login from "./Pages/Login/login";
import Signup from "./Pages/Signup/signup";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile/Profile";
import Feed from "./Components/Feed/Feed";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import NotLoggedIn from "./Components/NotLoggedIn";
import toast,{Toaster} from 'react-hot-toast'
export const TOAST_SUCCESS='toast_success'
export const TOAST_FAILURE='toast_failure'

function App() {

  const isLoading=useSelector(state=>state.appConfigReducer.isLoading)
  const toastData=useSelector(state=>state.appConfigReducer.toastData)
  const loadRef=useRef(null)

  useEffect(()=>{
    if(isLoading){
      loadRef.current?.continuousStart()
    }
    else{
      loadRef.current?.complete()
    }
  },[isLoading])

  useEffect(()=>{
    switch (toastData.type) {
      case (TOAST_SUCCESS):
        toast.success(toastData.message)
        break;
      case (TOAST_FAILURE):
        toast.error(toastData.message)  
        break 
    }
  },[toastData])

  return (
    <div className="App">
      <LoadingBar height={3} color='#458eff' ref={loadRef} />
      <div><Toaster/></div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<NotLoggedIn/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
