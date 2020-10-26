const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Contact {
        id: ID!
        name: String!
        phoneNum: [Phone]!
    }
    
    type Phone {
        id: ID!
        number: Float!
        numType: String!
    }
    
    type User {
        id: ID!
        username: String!
        phoneNum: Float!  
        createdAt: String!
        token: String!
    }

    type Query {
        getContact(contactId: ID!): Contact
        getContacts: [Contact]
    }
    
    type Mutation {
        createContact(name: String!, number: Float!, numType: String!): Contact!
        deleteContact(contactId: ID!): String!
        addNumberToExistingContact(contactId: ID!, number: Float!, numType: String!): Contact!
        deletePhoneNumber(contactId: ID!, phoneNumId: ID!): String!
        registerUser(username: String!, phoneNum: Float!, password: String!, confirmPassword: String!): User!
        loginUser(phoneNum: Float!, password: String!): User!
    }
`

module.exports = typeDefs