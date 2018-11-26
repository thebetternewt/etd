import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { AUTH_QUERY, REDIRECT_QUERY } from './queries';

const defaultState = {
  isAuthenticated: false,
  user: null,
  redirectPath: null,
};

const authToken = localStorage.getItem('token');

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken,
    },
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const request = async operation => {
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    withClientState({
      defaults: defaultState,
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } });
            return null;
          },
        },
      },
      cache,
    }),
    link,
  ]),
  cache,
});

const setAuthenticatedUser = userData => {
  client.cache.writeData({
    data: {
      isAuthenticated: true,
      user: { __typename: 'user', ...userData },
    },
  });
};

const getAuthenticatedUser = () => {
  const { user } = client.readQuery({
    query: AUTH_QUERY,
  });
  return user;
};

const isAuthenticated = () => {
  const { isAuthenticated: authenticated } = client.readQuery({
    query: AUTH_QUERY,
  });
  return authenticated;
};

const logOutUser = async () => {
  localStorage.removeItem('token');
  await client.resetStore();
};

const setRedirectPath = redirectPath => {
  client.cache.writeData({
    data: {
      redirectPath,
    },
  });
};

const getRedirectPath = () => {
  const { redirectPath } = client.readQuery({
    query: REDIRECT_QUERY,
  });
  return redirectPath;
};

export default client;
export {
  isAuthenticated,
  setAuthenticatedUser,
  getAuthenticatedUser,
  logOutUser,
  setRedirectPath,
  getRedirectPath,
};
