import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './Slices/AppConfigSlice'
import postSliceReducer from './Slices/PostSlice'
import feedDataReducer from  './Slices/feedSlice'
export default configureStore({
    reducer:{
        appConfigReducer,
        postSliceReducer,
        feedDataReducer
    }
})