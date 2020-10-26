import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../context/authContext/AuthContext'

// Route has a component ----> eg: component={Home}
// we ge that component as a prop and give an alias as Component
const AuthRoute = ({component: Component, ...rest}) => {
    
    const { user } = useContext(AuthContext)
    
    return (
        <Route 
            {...rest}
            render={
                (props) => !user ? <Redirect to='/login' /> : <Component {...props} />
            }
        />
    )
}

export default AuthRoute
