import { gql } from 'apollo-boost'

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($phoneNum: Float!, $password: String!) {
        loginUser(phoneNum: $phoneNum, password: $password) {
            id
            username
            phoneNum
            token
        }
    }
`
export const REGISTER_MUTATION = gql`
    mutation RegisterMutation($username: String!, $phoneNum: Float!, $password: String!, $confirmPassword: String!) {
        registerUser(username: $username, phoneNum: $phoneNum, password: $password, confirmPassword: $confirmPassword) {
            id
            username
            phoneNum
            token
        }
    }
`
export const CREATE_CONTACT_MUTATION = gql`
    mutation CreateContact($name: String!, $number: Float!, $numType: String!) {
        createContact(name: $name, number: $number, numType: $numType) {
            id
            name
            phoneNum {
                id
                number
                numType
            }
        }
    }
`

export const ADD_NUMBER_TO_EXISTING_CONTACT = gql`
    mutation AddNumberToExistingContact($contactId: ID!, $number: Float!, $numType: String!) {
        addNumberToExistingContact(contactId: $contactId, number: $number, numType: $numType) {
            id
            name
            phoneNum {
                id
                number
                numType
            }
        }
    }
`

export const DELETE_CONTACT_MUTATION = gql`
    mutation DeleteContact($contactId: ID!) {
        deleteContact(contactId: $contactId)
    }
`

export const DELETE_PHONE_NUMBER_MUTATION = gql`
    mutation DeletePhoneNumber($contactId: ID!, $phoneNumId: ID!) {
        deletePhoneNumber(contactId: $contactId, phoneNumId: $phoneNumId)
    }
`