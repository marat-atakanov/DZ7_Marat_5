import React from 'react';
import {useDispatch} from "react-redux";
import {getPost} from "../store/postSlice";

function Post(props) {
    const dispatch = useDispatch();

    const getMoreInfo = (e) => {
        dispatch(getPost(e.target.value))
    }

    return (
        <>
            <h1>{props.postInfo.title}</h1>
            <button onClick={getMoreInfo} value={props.postId}>more info</button>
            <p>--------------------------</p>
        </>
    );
}

export default Post;