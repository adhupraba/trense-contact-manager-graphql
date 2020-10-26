const jwt = require('jsonwebtoken')
const config = require('config')
const { AuthenticationError } = require('apollo-server-express')

const auth = (context) => {
    const authHeader = context.req.headers.authorization
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            try {
                const decoded = jwt.verify(token, config.get('SecretKey'))
                return decoded
            }
            catch(err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error('Authentiation token is not available')
    }
    throw new Error('Authorization header must be provided')
}

module.exports = auth