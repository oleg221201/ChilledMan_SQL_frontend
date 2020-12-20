import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";

export const User = ({id}) => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)
    const [currentUserData, setCurrentUserData] = useState(null)
    let isFollowed = "Follow"

    const getUserData = useCallback(async () => {
        const data = await request(`/api/profile/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        const data1 = await request(`/api/profile/`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })

        setCurrentUserData(data1.user)
        setUser(data.user)
    },[request, token, id])

    useEffect(() => {
        getUserData()
    },[getUserData])


    if (loading || !user) return (<div>loading...</div>)

    if (!currentUserData.friends) currentUserData.friends = []

    if (currentUserData && currentUserData.friends.includes(id)){
        isFollowed = "Unfollow"
    }

    const onBtnClick = async () => {
        if (isFollowed === "Unfollow"){
            await request(`/api/profile/unfollow/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            isFollowed = "Follow"
        } else {
            await request(`/api/profile/follow/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            isFollowed = "Unfollow"
        }
        window.location.reload(false)
    }

    if(userId === user.id) {
        return (
            <div className="row">
                <div className="col s8">
                    <h5><Link to={`/profile`}>{user.username}</Link></h5>
                </div>
            </div>
        )
    }


    return (
        <div className="row">
            <div className="col s8">
                <h5><Link to={`/user/${user.id}`}>{user.username}</Link></h5>
            </div>
            <div className="col s4">
                <button
                    style={{"marginTop": 20, "fontSize": 18}}

                    onClick={onBtnClick}
                >{isFollowed}</button>
            </div>
        </div>
    )
}