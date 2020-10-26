const Contact = require('../../model/Contact')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server-express')
const config = require('config')
const auth = require('../../middleware/auth')
const { contactValidation, addToExistingValidation } = require('../../validation/contactValidation')

const getCreator = (context) => {
    const token = context.req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, config.get('SecretKey'))
    return decoded
}

const contactResolver = {
    Query: {
        getContacts: (parent, args, context) => {
            const creator = getCreator(context)
            return Contact.find({creator: creator.id}).sort('name').then((contacts) => {
                console.log(contacts)
                return contacts
            }).catch((err) => {
                throw err
            })
        },
        getContact: (parent, args, context) => {
            const { contactId } = args
            const creator = getCreator(context)
            
            return Contact.findOne({_id: contactId, creator: creator.id}).then((contact) => {
                if (contact) {
                    return contact
                }
                else {
                    throw new Error('Contact not found')
                }
            }).catch((err) => {
                throw err
            })
        }
    },
    Mutation: {
        createContact: (parent, args, context) => {
            const { name, number, numType } = args
            const authorized = auth(context)
            const { errors, valid } = contactValidation(name, number)
            
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            return Contact.findOne({'phoneNum.number': number, creator: authorized.id}).then((contact) => {
                if (contact) {
                    throw new UserInputError('phone number already exists')
                }
                const phoneNum = [{
                    number,
                    numType
                }]
                const newContact = new Contact({
                    name,
                    phoneNum,
                    creator: authorized.id
                })
                return newContact.save().then((contact) => {
                    return contact
                }).catch((err) => {
                    throw err
                })
            }).catch((err) => {
                throw err
            })
        },
        addNumberToExistingContact: (parent, args, context) => {
            const { contactId, number, numType} = args
            const authorized = auth(context)
            const { errors, valid } = addToExistingValidation(number)
            
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            
            return Contact.findOne({'PhoneNum.number': number, creator: authorized.id}).then((contact) => {
                if (contact) {
                    throw new UserInputError(`Number is already added in ${contact.name}`)
                }
                return Contact.findById(contactId).then((contact) => {
                    contact.phoneNum.push({
                        number,
                        numType
                    })
                    return contact.save().then((contact) => {
                        return contact
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
        deletePhoneNumber: (parent, args, context) => {
            const { contactId, phoneNumId } = args
            const authorized = auth(context)
            
            return Contact.findByIdAndUpdate(contactId, {$pull: {'phoneNum': {_id: phoneNumId}}}).then((contact) => {
                return 'Phone Number deleted'
            }).catch((err) => {
                throw err
            })
        },
        deleteContact: (parent, args, context) => {
            const { contactId } = args
            const authorized = auth(context)
            
            return Contact.findOneAndDelete({_id: contactId}).then(() => {
                return 'Contact deleted'
            }).catch((err) => {
                throw err
            })
        }
    }
}

module.exports = contactResolver