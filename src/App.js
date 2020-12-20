import React from 'react'
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'

function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return  (
        <div>loading ...</div>
    )
  }

  return (
      <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          <div>
            {routes}
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App
