import ApolloServerHapi from 'apollo-server-hapi';
import mongodb from 'mongodb';

import typeDefs from './definitions/typeDefs';
import Query from './resolvers/query.resolvers';

const resolvers = {
    Query
  };

export default {
    name: 'graphql-server',
    async register(server) {
        const gqlServer = new ApolloServerHapi.ApolloServer({
          typeDefs,
          resolvers,
        });
    
        // eslint-disable-next-line no-param-reassign
        server.app.gqlServer = gqlServer;
    
        await gqlServer.applyMiddleware({ app: server });
        server.events.on('start', () => server.log('info', `GraphQL endpoint mounted on ${gqlServer.graphqlPath}`));
      },
}