import React, { useEffect, useState } from 'react'
import '../Profile/Profile.scss'
import Post from '../Post/Post'
import userImg from '../../Assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../Redux/Slices/PostSlice'
import { followAndUnfollow } from '../../Redux/Slices/feedSlice'
function Profile() {

  const navigate=useNavigate()
  const params=useParams()
  let userid=params.userid
  userid=userid.replace(':','')
  const userProfile=useSelector(state=>state.postSliceReducer.userProfile)
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile)
  // const length=userProfile.followers.length
  const dispatch=useDispatch()
  const [isMyProfile,setMyProfile]=useState(false)
  const [isfollowed,setisfollowed]=useState(false)
  
  useEffect(()=>{
    
    
    dispatch(getUserProfile({
      userId:userid
    }))
    
    if( myProfile._id!==userid){
      console.log(myProfile._id);
      setMyProfile(false)
      for(let i=0;i<myProfile?.followings?.length;i++){
        if(myProfile.followings[i]===userid){
          setisfollowed(true)
          break
        }
      }
    }
    else{
      setMyProfile(true)
    }
    

  },[params.userid])

  function updateprofile(){
    navigate('/updateProfile')
  }

  function handleFollow(){
    dispatch(followAndUnfollow({
      toFollowID:userid
    }))
    if(isfollowed){
      setisfollowed(false)
    }
    else{
      setisfollowed(true)
    }
  }
  
  return (
    <div className='profile'>
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost/>}
          {userProfile?.posts?.map(post=><Post key={post._id} post={post} isMyProfile={isMyProfile} userid={userid}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img src={(userProfile?.avatar?.url)?userProfile?.avatar?.url:userImg}  alt="" className='user-img'/>
            {(userProfile?.name) && <h3 className='user-name'>{`${userProfile?.name}`}</h3>}
            {(userProfile?.bio) && <h4 className='user-name'>{`${userProfile?.bio}`}</h4>}
            <div className="follower-info">
              {(userProfile?.followers?.length!=0) && <h4>{`${userProfile?.followers?.length} Followers`}</h4>}
              {(userProfile?.followings?.length!=0) && <h4>{`${userProfile?.followings?.length} Followings`}</h4>}
            </div>
            
            {/* {!isMyProfile && <button className='follow btn-primary'>Follow</button>} */}
            {isMyProfile && <button className='update-profile btn-secondary' onClick={updateprofile}>Update Profile</button>}
            {(!isMyProfile && isfollowed) && <button className='follow btn-primary' onClick={handleFollow}>Unfollow</button>}
            {(!isMyProfile && !isfollowed) && <button className='follow btn-primary' onClick={handleFollow}>Follow</button>} 
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile