import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Comment} from "../components/DetailPost/Comment"
import {Like} from "../components/DetailPost/Like";
import {Owner} from "../components/DetailPost/Owner";
import {AddComment} from "../components/DetailPost/AddComment";

export const DetailPostPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [post, setPost] = useState(null)
    const postId = useParams().id

    const getPost = useCallback(async () => {
        const data = await request(`/api/post/${postId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setPost(data.post)
    }, [request, postId, token])

    useEffect(() => {
        getPost()
    }, [getPost])

    if (loading || !post) return (<div>loading...</div>)
    if (!post.comments) post.comments=[]

    return (
        <div className="container">
            <h5>{post.text}</h5>
            <Owner data={post.owner} />
            <Like data={post.likes} postId={postId} />
            <AddComment data={postId} />
            <p>Comments:</p>
            {post.comments.map((comment) => {
                return (<Comment data={comment} />)
            })}
        </div>
    )
}