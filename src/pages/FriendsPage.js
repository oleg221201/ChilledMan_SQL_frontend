import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {User} from "../components/FriendsPage/User";

export const FriendsPage = () => {
    const id = useParams().id
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)

    const getUserData = useCallback(async () => {
        const data = await request(`/api/profile/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUser(data.user)
    },[request, token, id])

    useEffect(() => {
        getUserData()
    },[getUserData])

    if (loading || !user) return (<div>loading...</div>)

    if(!user.friends) return (<h4>No friends...</h4>)

    return (
        <div className="container">
            <h4>Following users:</h4>
            {user.friends.map((friendId) => {
                return <User id={friendId} />
            })}
        </div>
    )
}