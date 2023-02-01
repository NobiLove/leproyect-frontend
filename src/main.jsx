import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import './main.css'
import { BrowserRouter as Router } from 'react-router-dom'

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('library-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({
  uri: 'https://leproyect-backend-production.up.railway.app/'
})

const wsLink = new WebSocketLink({
  uri: 'wss://leproyect-backend-production.up.railway.app/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
