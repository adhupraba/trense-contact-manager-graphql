const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: String,
    phoneNum: Number,
    password: String,
    createdAt: String
})

module.exports = User = model('users', userSchema)