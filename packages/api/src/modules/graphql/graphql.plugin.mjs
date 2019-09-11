import ApolloServerHapi from 'apollo-server-hapi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import typeDefs from './definitions/typeDefs';

const createToken = (email, secret, expiresIn) => jwt.sign({ email }, secret);

const resolvers = {
  Query: {
    allEstablishements: (_, __, { server }) => server.plugins.mongodb.Establishement.find().toArray(),
    allUserKyrios: (_, __, { server }) => server.plugins.mongodb.UserKyrios.find().toArray(),
    me: (_, __, { server }) => server.plugins.mongodb.UserKyrios.find().toArray(),
  },

  Mutation: {
    signinUserKyrios: async (_, { email, password }, { server }) => {
      const userEmail = await server.plugins.mongodb.UserKyrios.findOne({ email });

      if (!userEmail) {
        throw new Error('User no exist');
      }

      const isValidePassword = await bcrypt.compare(password, userEmail.password);

      if (!isValidePassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(email, userEmail.password) };
    },
    upsertUserKyrios: async (_, { firstname, lastname, email, password, creationDate, role }, { server }) => {
      const userEmail = await server.plugins.mongodb.UserKyrios.findOne({ email });

      if (userEmail) {
        throw new Error('Email is already exist');
      }

      const userPassword = { password };
      const hashedPassword = await bcrypt.hash(userPassword.password, 10);

      const value = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        creationDate,
        role,
      };
      const { insertedId } = await server.plugins.mongodb.UserKyrios.insertOne(value);
      return { ...value, _id: insertedId };
    },
  },
};

export default {
  name: 'graphql-server',
  dependencies: ['mongodb', 'helikia'],
  async register(server) {
    const gqlServer = new ApolloServerHapi.ApolloServer({
      typeDefs,
      resolvers,
      async context({ request }) {
        const token = request.headers.authorization;
        return {
          server,
        };
      },
    });

    // eslint-disable-next-line no-param-reassign
    server.app.gqlServer = gqlServer;

    await gqlServer.applyMiddleware({ app: server });
    server.events.on('start', () => server.log('info', `GraphQL endpoint mounted on ${gqlServer.graphqlPath}`));
  },
};
