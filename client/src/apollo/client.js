import ApolloClient from 'apollo-boost';
import { AUTH_QUERY, REDIRECT_QUERY } from './queries';

const defaultState = {
  isAuthenticated: false,
  user: null,
  redirectPath: null,
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: defaultState,
  },
  request: operation => {
    const token = localStorage.getItem('token');
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
  },
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
