import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";

import store from  '../Redux/store'
import { TOAST_FAILURE } from "../App";
import { setLoading, showToast } from "../Redux/Slices/AppConfigSlice";
// import { toast } from "react-hot-toast";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});


axiosClient.interceptors.request.use((request) => {
  store.dispatch(setLoading(true))
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  console.log('came at request interceptor',accessToken);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  store.dispatch(setLoading(false))
  const data = response.data;

  console.log('response at interceptor',response);

  if (data.status === "ok") {
    return data;
  }
  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.message;

  // console.log('error',error);

  store.dispatch(showToast({
    type:TOAST_FAILURE,
    message:error
  }))

  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response1 = await axios
      .create({
        withCredentials: true,
      })
      .get("http://localhost:4000/auth/refresh");

    console.log(response1);
    
    if (response1.data.status === "ok") {
      console.log("setItem called");

      setItem(KEY_ACCESS_TOKEN, response1.data.result.accessToken);

      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response1.data.result.accessToken}`;

      return axios(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
  console.log('came at Promise.reject');
  return Promise.reject(error);
},async (e)=>{
  store.dispatch(setLoading(false))
  console.log(e);
  store.dispatch(showToast({
    type:TOAST_FAILURE,
    message:e.message
  }))
})

