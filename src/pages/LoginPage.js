import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage = () => {
    const {loading , request, error, clearErrors} = useHttp()
    const [data, setData] = useState({
        email: "", password: ""
    })
    const message = useMessage()
    const auth = useContext(AuthContext)

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message, clearErrors])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const login = async () => {
        try {
            const login_data = await request("/api/auth/login", "POST", {...data})
            auth.login(login_data.token, login_data.userId)
        } catch (err) {}
    }

    return (
        <div>
            <h3>ChilledMan</h3>
            <div className="row">
                <div className="col s4 offset-s4">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title" style={{paddingBottom: 10}}>Log in</span>

                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    name="email"
                                    type="text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    name="password"
                                    type="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                        <div className="card-action">
                            <button
                                className="btn"
                                style={{marginRight: 10}}
                                onClick={login}
                                disabled={loading}
                            >
                                Log in
                            </button>
                            <a href="/">I don`t have an account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}