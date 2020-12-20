import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Post} from "../components/Profile/Post";
import {Link} from "react-router-dom";
import style from '../components/Profile/Profile.module.css'


export const ProfilePage = () => {

    const [userData, setUserData] = useState(null)
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getUserData = useCallback( async () => {
        const data = await request('/api/profile', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUserData(data.user)
    }, [request, token])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    if (loading) return (<div>loading...</div>)

    if (!userData) return (<></>)
    else {
        if (!userData.friends){
            userData.friends = []
        }
        if(!userData.posts){
            userData.posts = []
        }
    }

    return(
        <div className={`row ${style.block}`}>
            <div className={`${style.profileInfo} col s2 offset-s1`}>
                <div>
                    <h4 className={style.username}>{userData.username}</h4>
                    <hr/>
                    <h5><Link to={`/friends/${userId}`}>Following:</Link></h5>
                    <h5>{userData.friends.length}</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="row">
                    <div className="col s1">

                    </div>
                    <div className={`col s10 ${style.posts}`}>
                        <h5>My posts:</h5>
                        <div className={style.posts_block}>
                            <div>
                                {userData.posts.reverse().map((postId) => {
                                    return (<Post data={postId}/>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div  className="col s1">

                    </div>
                </div>
            </div>
        </div>
    )
}