import { gql } from 'apollo-boost'

export const GET_ALL_CONTACTS_QUERY = gql`
    {
        getContacts {
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

export const GET_SINGLE_CONTACT = gql`
    query getSingleContact($contactId: ID!) {
        getContact(contactId: $contactId) {
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