const User = require('../../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { registerValidation, loginValidation } = require('../../validation/authValidation')

const transformUser = (user) => {
    const token = jwt.sign(
        {id: user.id, phoneNum: user.phoneNum, username: user.username},
        config.get('SecretKey'),
        {expiresIn: '1h'}
    )
    return {...user._doc, id: user.id, token}
}

const userResolver = {
    Mutation: {
        registerUser: (parent, args) => {
            const { username, phoneNum, password, confirmPassword } = args
            const { errors, valid } = registerValidation(username, phoneNum, password, confirmPassword)
            
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            
            return User.findOne({phoneNum}).then((user) => {
                console.log(user)
                if (user) {
                    throw new UserInputError('Phone Number already exists', {
                        errors: {
                            phoneNum: 'Phone Number already exists'
                        }
                    })
                }
                return bcrypt.hash(password, 15).then((hashed) => {
                    const newUser = new User({
                        username,
                        phoneNum,
                        password: hashed,
                        createdAt: new Date().toISOString()
                    })
                    return newUser.save().then((user) => {
                        return transformUser(user)
                    }).catch((err) => {
                        throw err
                    })
                }).catch((err) => {
                    throw err
                })
            }).catch((err) => {
                throw err
            })
        },
        loginUser: (parent, args) => {
            const { phoneNum, password } = args
            const { errors, valid } = loginValidation(phoneNum, password)
            
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            
            return User.findOne({phoneNum}).then((user) => {
                if (!user) {
                    errors.general = 'User does not exist'
                    throw new UserInputError('User does not exist', {errors})
                }
                return bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        errors.general = 'Invalid credentials'
                        throw new UserInputError('Invalid credentials', {errors})
                    }
                    return transformUser(user)
                }).catch((err) => {
                    throw err
                })
            }).catch((err) => {
                throw err
            })
        }
    }
}

module.exports = userResolver