import React from "react";
import Avatar from "../avatar/Avatar";

import { useDispatch } from "react-redux";
import {
  getUserProfile,
  postLikeAndDislike,
} from "../../Redux/Slices/PostSlice";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
function Post(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const postID = props.post._id;

  function handleLike() {
    dispatch(
      postLikeAndDislike({
        postID: props.post._id,
      })
    );
    // console.log(props.post._id);
  }

  async function handleDelete() {
    try {
      console.log("post id at frontend", props.post._id);
      await axiosClient.post("/posts/deletePost", {
        postID: props.post._id,
      });
      // console.log(response);
      dispatch(
        getUserProfile({
          userId: props.userid,
        })
      );
    } catch (e) {
      // console.log(e);
    }
  }
  return (
    <div className="Post">
      <div className="mheading">
        <div
          className="heading"
          onClick={() => {
            navigate(`/profile/:${props.post.owner._id}`);
          }}
        >
          <Avatar src={props.post?.owner?.avatar?.url} />
          <h4>{props.post?.owner?.name}</h4>
        </div>
        {props.isMyProfile && (
          <i
            className="fa-solid fa-trash bin"
            style={{ color: "var(--accent-color)", fontSize: "20px" }}
            onClick={handleDelete}
          ></i>
        )}
      </div>
      <div className="content">
        <img src={props.post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          {props.post?.isLiked ? (
            <i
              className="fa-solid fa-heart"
              onClick={handleLike}
              style={{ color: "red", cursor: "pointer" }}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart"
              onClick={handleLike}
              style={{ cursor: "pointer" }}
            ></i>
          )}

          <h4>{`${props.post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">{props.post?.caption}</p>
        <h6 className="time-ago">{props.post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
