import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../Utils/axiosClient'

import { followAndUnfollow } from './feedSlice'


export const getUserProfile=createAsyncThunk('user/getUserProfile',async (body,thunkAPI)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        // console.log('api called');
        const response=await axiosClient.post('/user/getUserProfile',body)
        
        console.log('get userprofile called' ,response.result);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})
export const postLikeAndDislike=createAsyncThunk('post/LikeAndDislike',async (body,thunkAPI)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        
        const response=await axiosClient.post('/posts/like',body)
        // console.log('post like and dislike api called',response.result);
        return response.result.post
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})


const PostSlice=createSlice({
    name:'PostSlice',
    initialState:{
        userProfile:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserProfile.fulfilled,(state,action)=>{
            state.userProfile=action.payload
            console.log(state.userProfile);
        })
        .addCase(postLikeAndDislike.fulfilled,(state,action)=>{
            const post=action.payload
            const index=state?.userProfile?.posts?.findIndex(item=>item._id===post._id)
            if(index!=undefined && index!=-1){
                state.userProfile.posts[index]=post
            }
        })
        .addCase(followAndUnfollow.fulfilled,(state,action)=>{
            
            const follow=action.payload.userID
            const index=state?.userProfile?.followers?.findIndex(item=>item===follow)
            if(index!=-1){
                state?.userProfile?.followers?.splice(index,1)
            }
            else{
                state?.userProfile?.followers?.push(follow)
            }
        })
    }
})


export default PostSlice.reducer
