import { useState } from 'react'

export const useForm = (callback, initialState={}) => {
    
    const [values, setValues] = useState(initialState)
    
    const changeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        setValues(initialState)
        callback()
    }
    
    return {changeHandler, submitHandler, values}
}