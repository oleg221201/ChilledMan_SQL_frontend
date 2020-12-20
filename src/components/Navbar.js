import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const  logoutHandler = event => {
        event.preventDefault() // не опрацьовує посилання
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">ChilledMan</span>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/peoples">All users</NavLink></li>
                    <li><NavLink to="/news">News</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><a href="/signOut" onClick={logoutHandler}>Sign out</a></li>
                </ul>
            </div>
        </nav>
    )
}