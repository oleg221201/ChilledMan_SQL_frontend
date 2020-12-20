import React, {useContext, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";


export const AddComment = ({data}) => {
    const [text, setText] = useState({comment: "", postId: data})
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const addComment = async () => {
        try {
            await request('/api/post', 'PUT', text, {
                Authorization: `Bearer ${token}`
            })
            document.getElementById("inputComment").value = ""
            setText({comment: ""})
            window.location.reload(false)
        } catch (err) {}
    }

    const changeHandler = event => {
        setText({...text, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <div className="input-field">
                <input
                    id="inputComment"
                    placeholder="Add your comment..."
                    name="comment"
                    type="text"
                    onChange={changeHandler}
                />
            </div>
            <button
                onClick={addComment}
                disabled={loading}
            >Add comment</button>
        </div>
    )
}