import React from 'react'
import ReactDOM from 'react-dom/client'
import client from './common/apollo-client'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
