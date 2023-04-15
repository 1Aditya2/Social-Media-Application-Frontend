import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../Utils/axiosClient'
import { followAndUnfollow } from './feedSlice'

export const getMyProfile=createAsyncThunk('user/getMyProfile',async (_)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        const response=await axiosClient.get('/user/getMyProfile')
        
        // console.log('myprofile data called',response.result);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})

export const updateMyProfile=createAsyncThunk('user/updateMyProfile',async (body)=>{
    try {
        // thunkAPI.dispatch(setLoading(true))
        const response=await axiosClient.put('/user/updateMyProfile',body)
        
        // console.log('api data called',response);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        // thunkAPI.dispatch(setLoading(false))
    }
})

const appConfigSlice=createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        toastData:{},
        myProfile:{}
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        showToast:(state,action)=>{
            state.toastData=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload.user
            // console.log(state.myProfile);
        })
        .addCase(updateMyProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload.user
            // console.log(state.myProfile);
        })
        .addCase(followAndUnfollow.fulfilled,(state,action)=>{
            const follow=action.payload._id
            const index=state?.myProfile?.followings?.findIndex(item=>item===follow)
            if(index!=-1){
                state?.myProfile?.followings?.splice(index,1)
            }
            else{
                state?.myProfile?.followings?.push(follow)
            }
        })
    }
})


export default appConfigSlice.reducer

export const {setLoading,showToast}=appConfigSlice.actions