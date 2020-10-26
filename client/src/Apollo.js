import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
})

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers={}}) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${localStorage.getItem('token')}` || null
        }
    }))
    return forward(operation)
})

const client = new ApolloClient({
    link: from([
        authLink,
        httpLink
    ]),
    cache: new InMemoryCache()
})

const Apollo = () => {
    
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default Apollo
