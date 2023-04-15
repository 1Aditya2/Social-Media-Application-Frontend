import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "../Follower/Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollow } from "../../Redux/Slices/feedSlice";
import { useNavigate } from "react-router-dom";
function Follower({follow}) {
  const navigate=useNavigate()
  const feed=useSelector(state=>state.feedDataReducer.feedData)
  const [isFollowing,setFollowing]=useState(false)
  const dispatch=useDispatch()

  useEffect(() => {
    feed?.followings.map((item)=>{
      if(item._id===follow._id){
        return setFollowing(true)
      }
      
    })
    // setFollowing(false)
  }, [])

  function handleFollow(){
    dispatch(followAndUnfollow({
      toFollowID:follow._id
    }))
  }
  
  return (
    <div className="Follower">
      <div className="user-info" >
        <Avatar src={follow?.avatar?.url}/>
        <h4 className="name" onClick={()=>{navigate(`/profile/:${follow._id}`)}}>{follow?.name}</h4>
      </div>

      <h5 className={isFollowing?'hover-link follow-link':'btn-primary'} onClick={handleFollow}>{isFollowing?'Unfollow':'Follow'}</h5>
    </div>
  );
}

export default Follower;
