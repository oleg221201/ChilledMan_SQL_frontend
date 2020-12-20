import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {User} from "../components/FriendsPage/User";

export const AllUsersPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [users, setUsers] = useState(null)

    const getUsers = useCallback(async () => {
        const data = await request(`/api/profile/users`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUsers(data.users)
    },[request, token])

    useEffect(() => {
        getUsers()
    },[getUsers])

    if (loading || !users) return (<div>loading...</div>)

    return (
        <div className='row'>
            <div className="col s3 offset-s1">
                {users.map((user)=>{
                    return (<User id={user.id}/>)
                })}
            </div>
        </div>
    )
}