import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import authReducer from './AuthReducer'
import { LOGIN, LOGOUT } from '../types'
import jwt from 'jsonwebtoken'

const initialState = {
    user: null,
    tokenExpiredMsg: null
}

const token = localStorage.getItem('token')
if (token) {
    const decodedToken = jwt.decode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        initialState.tokenExpiredMsg = 'Your token has expired. Login again to continue.'
    }
    else {
        initialState.user = decodedToken
    }
}

const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    
    const login = (userData) => {
        dispatch({
            type: LOGIN,
            payload: userData
        })
    }
    
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }
    
    return (
        <AuthContext.Provider value={{
            user: state.user, tokenExpiredMsg: state.tokenExpiredMsg, 
            login, logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
