module.exports.contactValidation = (name, number) => {
    const errors = {}
    
    if (name.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (number.length < 10) {
        errors.number = 'Phone Number should not be less than 10 digits'
    }
    else if (number.length > 10) {
        errors.number = 'Phone Number should not be greater than 10 digits'
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.addToExistingValidation = (number) => {
    const errors = {}
    
    if (number.length < 10) {
        errors.number = 'Phone Number should not be less than 10 digits'
    }
    else if (number.length > 10) {
        errors.number = 'Phone Number should not be greater than 10 digits'
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}