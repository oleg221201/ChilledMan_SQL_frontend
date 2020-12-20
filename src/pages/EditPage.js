import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";


export const EditPage = () => {
    const id = useParams().id
    const [text, setText] = useState({text: ""})
    const [post, setPost] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const getPostData = useCallback(async () => {
        const data = await request(`/api/post/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setPost(data.post)
    }, [request, token, id])

    useEffect(() => {
        getPostData()
    }, [getPostData])

    const changeHandlers = event => {
        setText({...text, [event.target.name]: event.target.value})
    }

    const edit = async () => {
        try {
            await request('/api/post', 'PUT', {text: text.text, postId: id}, {
                Authorization: `Bearer ${token}`
            })
        } catch (err) {}
    }

    if (loading) return (<div>loading...</div>)
    if (!post) return (<></>)

    return(
        <div className='row'>
            <div className='col s6 offset-s2'>
                <h4>Edit post</h4>
                <div className="input-field">
                    <textarea
                        id="textarea"
                        className="materialize-textarea"
                        placeholder="Here you can edit this post ..."
                        name="text"
                        cols="15"
                        defaultValue={post.text}
                        onChange={changeHandlers}
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={edit}
                >
                    <Link style={{color: "black"}} to={'/profile'}>Save changes</Link>
                </button>
            </div>
        </div>
    )
}