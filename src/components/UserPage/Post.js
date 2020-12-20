import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";


export const Post = ({data}) => {

    const [post, setPost] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getPostData = useCallback(async () => {
        const postData = await request(`/api/post/${data}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setPost(postData.post)
    }, [request, token, data])

    useEffect(() => {
        getPostData()
    },[getPostData])

    if (loading) return (<div>loading...</div>)
    if (!post) return (<></>)

    return (
        <div>
            <p>{post.text}</p>
            <Link to={`/detail/${post.id}`}>More...</Link>
        </div>
    )
}