import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloLink
} from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
    uri: '/graphql'
  });

const wsLink = new WebSocketLink({
    uri: `ws:localhost:5000/subscriptions`,
    options: {
        reconnect: true
    }
});

const link = ApolloLink.split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();
