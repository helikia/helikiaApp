import ApolloServerHapi from 'apollo-server-hapi';

import typeDefs from './definitions/typeDefs';
// import Query from './resolvers/query.resolvers';
// import Etablishement from './resolvers/queries/etablishement.resolvers';

const resolvers = {
  Query: {
    etablishement: () => server.plugins.mongodb['etablishement'].find().toArray(),
  },
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
};
