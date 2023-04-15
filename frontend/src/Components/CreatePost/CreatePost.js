import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import '../CreatePost/CreatePost.scss'

import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import { getUserProfile } from "../../Redux/Slices/PostSlice";
function CreatePost() {
    const [postImage,setPostImage]=useState('')
    const [caption,setCaption]=useState('')
    const myProfile=useSelector(state=>state.appConfigReducer.myProfile)
    const dispatch=useDispatch()
    function handleImageChange(e){

        const file=e.target.files[0]
        const filereader=new FileReader()
        filereader.readAsDataURL(file)
        filereader.onload=()=>{
            if(filereader.readyState===filereader.DONE){
                setPostImage(filereader.result)
            }
        }
    }

    async function handlePostSubmit(){
        try {
            // dispatch(setLoading(true))
            const result=await axiosClient.post('/posts/',{
                caption,
                postImage
            })
            console.log('result at frontend',result);
            dispatch(getUserProfile({
              userId:myProfile._id
            }))
        } catch (e) {
            console.log(e);
        }
        finally{
          console.log('came in final');
            // dispatch(setLoading(false))
            setCaption('')
            setPostImage('')
        }
    }


  return (
    <div className="createpost">
      <div className="left-part">
        <Avatar src={myProfile?.avatar?.url}/>
      </div>
      <div className="right-part">
        <input type="text" className="captionInput" placeholder="Whats on your mind?" value={caption} onChange={(e)=>{setCaption(e.target.value)}}/>

        {postImage && (<div className="img-container">
          <img src={postImage} className="post-img" alt="post image" />
        </div>)}

        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
            <i className="fa-regular fa-image"></i>
            </label>
            <input
              type="file"
              className="inputImg"
              id="inputImg"
              accept="image/*"
              
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
