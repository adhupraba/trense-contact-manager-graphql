import { createContext } from 'react'

const AuthContext = createContext({
    user: null,
    tokenExpiredMsg: null,
    login: (userData) => {},
    logout: () => {}
})

export default AuthContext