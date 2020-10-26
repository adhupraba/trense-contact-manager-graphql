const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
    name: String,
    phoneNum: [
        {
            number: Number,
            numType: {
                type: String,
                default: 'Mobile'
            }
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Contact = model('contacts', contactSchema)