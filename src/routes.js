import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {CreatePostPage} from "./pages/CreatePostPage";
import {DetailPostPage} from "./pages/DetailPostPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {LoginPage} from "./pages/LoginPage";
import {NewsPage} from "./pages/NewsPage";
import {EditPage} from "./pages/EditPage";
import {UserPage} from "./pages/UserPage";
import {FriendsPage} from "./pages/FriendsPage";
import {AllUsersPage} from "./pages/AllUsersPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/news" exact>
                    <NewsPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePostPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPostPage />
                </Route>
                <Route path="/edit/:id">
                    <EditPage />
                </Route>
                <Route path="/user/:id">
                    <UserPage />
                </Route>
                <Route path="/friends/:id">
                    <FriendsPage />
                </Route>
                <Route path="/peoples">
                    <AllUsersPage />
                </Route>
                <Redirect to="/news" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <RegistrationPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}