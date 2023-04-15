import React, { useEffect } from 'react'
import '../Feed/Feed.scss'
import Post from '../Post/Post'
import '../Post/Post.scss'
import Follower from '../Follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../Redux/Slices/feedSlice'
function Feed() {
  const dispatch=useDispatch()
  const feed=useSelector(state=>state.feedDataReducer.feedData)
  useEffect(()=>{
    dispatch(getFeedData())
  },[])
  return (
    <div className='Feed'>
      <div className="container">
        <div className="left-part">
          {feed?.posts?.map(post=><Post key={post._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className='title'>You are following</h3>
            {feed?.followings?.map(follow=><Follower key={follow._id} follow={follow}/>)}
            
          </div>
          <div className="suggestions">
            <h3 className='title'>Suggested for you!</h3>
            {feed?.suggestions?.map(suggest=><Follower key={suggest._id} follow={suggest}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed