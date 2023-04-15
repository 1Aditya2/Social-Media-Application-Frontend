import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import defuserimg from '../../Assets/user.png'
import { useSelector, useDispatch } from "react-redux";
import { updateMyProfile } from "../../Redux/Slices/AppConfigSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";

import { axiosClient } from "../../Utils/axiosClient";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const myprofile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userimg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setName(myprofile?.name || "");
    setBio(myprofile?.bio || "");
    setUserImg(myprofile?.avatar?.url || defuserimg);
  }, [myprofile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === filereader.DONE) {
        setUserImg(filereader.result);
      }
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userimg,
      })
    );
  }

  async function handleDelete() {
    try {
      // dispatch(setLoading(true))
      const re = await axiosClient.delete("/user/deleteMyProfile");

      if (re !== undefined) {
        console.log(re.result);
        removeItem(KEY_ACCESS_TOKEN);
        navigate("/login");
      }

      // dispatch(setLoading(false))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userimg} alt="" />
            </label>
            <input
              type="file"
              className="inputImg"
              id="inputImg"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              value={bio}
              placeholder="Your Bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <input
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="delete-account btn-primary" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
