import React, { useState, useContext } from 'react'
import { useMutation } from 'react-apollo'
import { REGISTER_MUTATION } from '../../graphql/mutations'
import { Form, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/authContext/AuthContext'
import { useForm } from './../../hooks/useForm';

const Register = (props) => {
    
    const authContext = useContext(AuthContext)
    
    const initialState = {
        username: '',
        phoneNum: '',
        password: '',
        confirmPassword: ''
    }
    const [errors, seterrors] = useState({})
    const { changeHandler, submitHandler, values } = useForm(login, initialState)
    
    const { username, phoneNum, password, confirmPassword } = values
    
    const [registerUser, {loading}] = useMutation(REGISTER_MUTATION, {
        update(proxy, {data: {registerUser: userData}}) {
            authContext.login(userData)
            props.history.replace('/')
        },
        variables: {
            username,
            phoneNum: phoneNum === '' ? 0 : parseInt(phoneNum),
            password,
            confirmPassword
        },
        onError(err) {
            seterrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })
    
    function login() {
        registerUser()
    }
    
    return (
        <div className='form-container'>
            <Form onSubmit={submitHandler} noValidate className={loading ? 'loading': ''}>
                <div className='page-title'>
                    <h1>Register</h1>
                </div>
                <Form.Input 
                    label='Username' placeholder='username' name='username'
                    error={errors.username ? {content: errors.username} : null}
                    type='text' value={username} onChange={changeHandler}
                />
                <Form.Input 
                    label='Phone Number' placeholder='Phone Number' name='phoneNum'
                    error={errors.phoneNum ?{content: errors.phoneNum} : null}
                    type='number' value={phoneNum} onChange={changeHandler}
                />
                <Form.Input 
                    label='Password' placeholder='Password' name='password'
                    error={errors.password ? {content: errors.password} : null}
                    type='password' value={password} onChange={changeHandler}
                />
                <Form.Input 
                    label='Confirm Password' placeholder='Confirm Password' name='confirmPassword'
                    error={errors.confirmPassword ? {content: errors.confirmPassword} : null}
                    type='password' value={confirmPassword} onChange={changeHandler}
                />
                <Button type='submit' primary>Register</Button>
            </Form>
            <div className='auth-link'>Already have an account? <NavLink to='/login'>Login</NavLink></div>
        </div>
    )
}

export default Register
