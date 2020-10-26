import { LOGIN, LOGOUT } from '../types'

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('token', action.payload.token)
            return {...state, user: action.payload}
        case LOGOUT:
            localStorage.removeItem('token')
            return {...state, user: null}
        default:
            return state
    }
}

export default authReducer