import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Post} from "../components/News/Post";

export const NewsPage = () => {
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [news, setNews] = useState(null)

    const getNewsData = useCallback(async () => {
        const data = await request('/api/profile/news', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setNews(data.postsData.postsDataArray)
    }, [request, token])

    useEffect(() => {
        getNewsData()
    },[getNewsData])

    if (loading) return (<div>loading...</div>)
    if (!news) return (<div>You and friends that you followed has no posts</div>)

    return (
        <div className='row'>
            <div className="col s6 offset-s1">
                <h4>
                    News:
                </h4>
                <div>
                    {news.map((post) => {
                        return (<Post data={post}/>)
                    })}
                </div>
            </div>
        </div>
    )
}