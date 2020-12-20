import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";


export const Like = ({data, postId}) => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    let likeBtnText = "Like"

    const onBtnClick = async () => {
        if (data.includes(userId)) {
            await request('/api/post', 'PUT', {like: userId, postId: postId}, {
                Authorization: `Bearer ${token}`
            })
            likeBtnText = "Like"
        } else {
            await request('/api/post', 'PUT', {like: userId, postId: postId}, {
                Authorization: `Bearer ${token}`
            })
            likeBtnText = "Dislike"
        }
        window.location.reload(false)
    }

    if(!data) data = []

    if (data.includes(userId)){
        likeBtnText = "Dislike"
    }

    return (
        <div>
            <button
                backgroundColor="lightgray"
                onClick={onBtnClick}
                disabled={loading}
            >{likeBtnText}</button>
            <p>Likes: {data.length}</p>
        </div>
    )
}