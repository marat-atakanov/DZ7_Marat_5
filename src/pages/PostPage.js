import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAll, getPosts} from "../store/postsSlice";
import Post from "../components/Post";
import {Spinner} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import {deleteMoreInfo} from "../store/postSlice";

function PostPage() {

    const dispatch = useDispatch()
    const {posts, preloader, error} = useSelector(state => state.postsReducer)
    const {title, body, postPreloader, message} = useSelector(state => state.postReducer)

    const getPostsFunc = () => {
        dispatch(getPosts())
    }
    useEffect(() => {
        getPostsFunc()
    }, []);

    const deleteAllFunc = () => {
        dispatch(deleteAll())
        dispatch(deleteMoreInfo())
    }

    return (
        <>

            {postPreloader
                ?
                <Spinner animation="border" variant={"secondary"}/>
                : message
                    ?
                    <h3>{message}</h3>
                    :
                    <>
                        {title && <p>Title: {title}</p>}
                        {body && <p>Description: {body}</p>}
                    </>
            }
            <button onClick={getPostsFunc}>get posts</button>
            <button onClick={deleteAllFunc}>delete all</button>
            {preloader
                ?
                <Spinner animation="border" variant={"primary"}/>
                : error
                    ?
                    <h3>{error}</h3>
                    :
                    posts.map(post => <Post postId={post.id} postInfo={post}/>)
            }

        </>
    );
}

export default PostPage;