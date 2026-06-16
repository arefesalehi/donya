/* eslint-disable react-hooks/exhaustive-deps */

import './App.css'
import { useRoutes } from 'react-router-dom'
import donyaRoutes from './routes'
import AuthContext from './context/Context'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const routes = useRoutes(donyaRoutes)

  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfo(userInfos)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfo({})
    localStorage.removeItem('user')
  }, [])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    if (localStorageData) {
      axios({
        url: 'http://localhost:4000/v1/auth/me',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      }).then((userData) => {
        setIsLoggedIn(true)
        setUserInfo(userData)
      })
    } else {
      setIsLoggedIn(false)
    }
  }, [login, logout])

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          userInfo,
          login,
          logout,
        }}
      >
        {routes}
      </AuthContext.Provider>
    </>
  )
}

export default App
