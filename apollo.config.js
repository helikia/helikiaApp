/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import VueApollo from 'vue-apollo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token';

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint: 'http://localhost:34735/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Is being rendered on the server?
  ssr: false,
  // Override default http link
  // link: myLink,
  // Override default cache
  // cache: myCache,
  // Additional ApolloClient options
  // apollo: { ... }
  getAuth: (tokenName) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(tokenName);
    // return the headers to the context so httpLink can read them
    return token || '';
  },
};

function isUnauthorizedError(error) {
  const { graphQLErrors } = error;
  return (graphQLErrors && graphQLErrors.some(e => e.message === 'Unauthorized'));
}

// Call this in the Vue app file
export function createProvider(options = {}, { router }) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      if (isUnauthorizedError(error)) {
        // Redirect to login page
        if (router.currentRoute.name !== 'login') {
          router.replace({
            name: 'login',
            params: {
              wantedRoute: router.currentRoute.fullPath,
            },
          });
        }
      } else {
        console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
      }
    },
  });
  return apolloProvider;
}
