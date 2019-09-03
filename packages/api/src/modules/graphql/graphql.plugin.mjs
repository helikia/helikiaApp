import ApolloServerHapi from 'apollo-server-hapi';

import typeDefs from './definitions/typeDefs';
// import Query from './resolvers/query.resolvers';
// import Etablishement from './resolvers/queries/etablishement.resolvers';

const resolvers = {
  Query: {
    allEstablishements: (_, __, { server }) => server.plugins.mongodb.Establishement.find().toArray(),
  },
};

export default {
  name: 'graphql-server',
  dependencies: ['mongodb', 'helikia'],
  async register(server) {
    const gqlServer = new ApolloServerHapi.ApolloServer({
      typeDefs,
      resolvers,
      context: async () => ({
        server,
      }),
    });

    // eslint-disable-next-line no-param-reassign
    server.app.gqlServer = gqlServer;

    await gqlServer.applyMiddleware({ app: server });
    server.events.on('start', () => server.log('info', `GraphQL endpoint mounted on ${gqlServer.graphqlPath}`));
  },
};
