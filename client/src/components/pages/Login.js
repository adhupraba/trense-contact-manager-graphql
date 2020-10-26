import React, { useState, useContext } from 'react'
import { useMutation } from 'react-apollo'
import { LOGIN_MUTATION } from '../../graphql/mutations'
import { Form, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/authContext/AuthContext'
import { useForm } from './../../hooks/useForm';

const Login = (props) => {
    
    const authContext = useContext(AuthContext)
    
    const initialState = {
        phoneNum: '',
        password: ''
    }
    const [errors, setErrors] = useState({})
    const { changeHandler, submitHandler, values } = useForm(login, initialState)
    
    const { phoneNum, password } = values
    
    const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, {
        update(proxy, {data: {loginUser: userData}}) {
            authContext.login(userData)
            props.history.replace('/')
        },
        variables: {
            phoneNum: phoneNum === '' ? 0 : parseInt(phoneNum),
            password
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })
    
    function login() {
        loginUser()
    }
    
    return (
        <div className='form-container'>
            <Form onSubmit={submitHandler} noValidate className={loading ? 'loading': ''}>
                <div className='page-title'>
                    <h1>Login</h1>
                </div>
                <Form.Input 
                    label='Phone Number' placeholder='Phone Number' name='phoneNum'
                    fluid error={errors.phoneNum ? {content: errors.phoneNum} : null}
                    type='number' value={phoneNum} onChange={changeHandler}
                />
                <Form.Input 
                    label='Password' placeholder='Password' name='password'
                    fluid error={errors.password ? {content: errors.password} : null}
                    type='password' value={password} onChange={changeHandler}
                />
                <Button type='submit' primary>Login</Button>
            </Form>
            <div className='auth-link'>Don't have an account? <NavLink to='/register'>Register</NavLink></div>
        </div>
    )
}

export default Login
