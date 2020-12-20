import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import style from "./Profile.module.css"


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

    const postDelete = async () => {
        await request(`/api/post/${data}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
        window.location.reload(false)
    }

    return (
        <div>
            <h6>{post.text}</h6>
            <div className={style.btn_more}>
                <Link to={`/detail/${data}`}>More...</Link>
            </div>
            <div className={style.edit_del_block}>
                <button
                    className={style.btn_edit}
                    disabled={loading}
                >
                    <Link style={{color: "black"}} to={`/edit/${data}`}>Edit</Link>
                </button>
                <button
                    className={style.btn_del}
                    disabled={loading}
                    onClick={postDelete}
                >Delete</button>
            </div>
        </div>
    )
}