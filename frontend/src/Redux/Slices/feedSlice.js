import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../Utils/axiosClient'

import { postLikeAndDislike } from './PostSlice'
export const getFeedData=createAsyncThunk('user/getFeedData',async (_)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        
        const response=await axiosClient.get('/user/getFeedData')
        // console.log('feed of the user',response.result);
        // console.log('userprofile',response);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})
export const followAndUnfollow=createAsyncThunk('post/followAndUnfollow',async (body)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        
        const response=await axiosClient.post('/user/follow',body)
        console.log('follow and unfollow api called',response.result);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})


const feedSlice=createSlice({
    name:'feedSlice',
    initialState:{
        feedData:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getFeedData.fulfilled,(state,action)=>{
            state.feedData=action.payload
            // console.log('feed data ',state.feedData);
        })
        .addCase(postLikeAndDislike.fulfilled,(state,action)=>{
            const post=action.payload
            const index=state.feedData.posts.findIndex(item=>item._id===post._id)
            if(index!=-1){
                state.feedData.posts[index]=post
            }
        })
        .addCase(followAndUnfollow.fulfilled,(state,action)=>{
            const follow=action.payload
            // console.log('user followed or unfollowed',follow);
            const index=state.feedData.followings.findIndex(item=>item._id===follow._id)
            const sindex=state.feedData.suggestions.findIndex(item=>item._id===follow._id)
            
            // console.log(index);
            if(index!=-1){
                state.feedData.followings.splice(index,1)

                state.feedData.suggestions.push(follow)
                let c=0;
                state.feedData.posts.map((post)=>{
                    if(post.owner._id===follow._id){
                        c++;
                    }
                })
                for(let i=0;i<c;i++){
                    const pindex=state.feedData.posts.findIndex(post=>post.owner._id===follow._id)

                    state.feedData.posts.splice(pindex,1)
                }
              
            }
            else{
                state.feedData.followings.push(follow)
                state.feedData.suggestions.splice(sindex,1)
                for(let i=0;i<follow.posts.length;i++){
                    state.feedData.posts.unshift(follow.posts[i])
                }
            }

        })
    }
})


export default feedSlice.reducer
