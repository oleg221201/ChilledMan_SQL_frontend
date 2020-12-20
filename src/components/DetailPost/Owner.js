import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";


export const Owner = ({data}) => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)

    const getUser = useCallback(async () => {
        const res = await request(`/api/profile/${data}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUser(res.user)
    }, [request, token, data])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (loading || !user) return (<div>loading...</div>)

    if(userId === user.id) {
        return (
            <div>
                <p>by <Link to={`/profile`}>{user.username}</Link></p>
            </div>
        )
    }


    return (
        <div>
            <p>by <Link to={`/user/${user.id}`}>{user.username}</Link></p>
        </div>
    )
}