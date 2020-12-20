import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";


export const CreatePostPage = () => {
    const [text, setText] = useState({text: ""})
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const message = useMessage()

    const changeHandler = event => {
        setText({...text, [event.target.name]: event.target.value})
    }
    const create = async () => {
        try {
            const res = await request('/api/post', 'POST', text, {
                Authorization: `Bearer ${token}`
            })
            message(res.message)
            document.getElementById("textarea").value = ""
            setText({text: ""})
        } catch (err) {}
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s1'>
                <h4>Create new post</h4>
                <div className="input-field">
                    <textarea
                        id="textarea"
                        className="materialize-textarea"
                        placeholder="What would you want to wrote?"
                        name="text"
                        cols="15"
                        onChange={changeHandler}
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={create}
                >Create</button>
            </div>
        </div>
    )
}