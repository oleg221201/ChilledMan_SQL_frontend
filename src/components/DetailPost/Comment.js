import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

export const Comment = ({data}) => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [comment, setComment] = useState(null)
    //const [user, setUser] = useState(null)

    const getComment = useCallback(async () => {
        const req_data = await request(`/api/post/comment/${data}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setComment(req_data.comment)
    },[request, token, data])

    // const getUser = useCallback(async () => {
    //     const data = await request(`/api/profile/${comment.owner}`, 'GET', null, {
    //         Authorization: `Bearer ${token}`
    //     })
    //     setUser(data.user)
    // }, [request, token, comment.owner])

    useEffect(() => {
        getComment()
        // getUser()
    },[getComment])

    if (loading) return (<div>loading...</div>)

    if (!comment) return (<></>)


    return (
        <div>
            <p>{comment.text}</p>
        </div>
    )
}