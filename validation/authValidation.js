module.exports.registerValidation = (username, phoneNum, password, confirmPassword) => {
    const errors = {}
    const regex = /^\d{10}$/
    
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    
    if (!phoneNum.toString().match(regex)) {
        errors.phoneNum = 'Enter a valid 10 digit phone number'
    }
    
    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.loginValidation = (phoneNum, password) => {
    const errors = {}
    const regex = /^\d{10}$/
    
    if (!phoneNum.toString().match(regex)) {
        errors.phoneNum = 'Enter a valid 10 digit phone number'
    }
    
    if (password === '') {
        errors.password = 'Password must not be empty'
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}