import React from 'react'
import {Link} from "react-router-dom";
import style from "./News.module.css"


export const Post = ({data}) => {

    return (
        <div className={style.post} key={data.id}>
            <p>{data.text}</p>
            <Link to={`/detail/${data.id}`}>More...</Link>
        </div>
    )
}