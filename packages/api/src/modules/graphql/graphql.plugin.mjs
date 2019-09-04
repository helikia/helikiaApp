import ApolloServerHapi from 'apollo-server-hapi';
import typeDefs from './definitions/typeDefs';
import bcrypt from 'bcrypt';
// import md5 from 'md5';

// const createToken = (user, secret, expiresIn) => {
//   const { email, password } = user;
//   return jwt.sign({ email, password }, secret, {});
// };


const resolvers = {
  Query: {
    allEstablishements: (_, __, { server }) => server.plugins.mongodb.Establishement.find().toArray(),
    allUserKyrios: (_, __, { server }) => server.plugins.mongodb.UserKyrios.find().toArray(),
    me: (_, __, { server }) => server.plugins.mongodb.UserKyrios.find().toArray(),
  },


  Mutation: {
    // signInUserKyrios: async (_, { firstname, lastname, email, password }, { server }) => {
    //   const userEmail = await server.plugins.mongodb.UserKyrios.findOne({ email });

    //   if (!userEmail) {
    //     throw new Error('User not found');
    //   }

    //   const isValidPassword = await bcrypt.compare()
    // },

    upsertUserKyrios: async (_, { firstname, lastname, email, password }, { server }) => {
      const userEmail = await server.plugins.mongodb.UserKyrios.findOne({ email });

      if (userEmail) {
        throw new Error('Email is already exist');
      }

      // bcrypt.genSalt(10, (err, salt) => {
      //   console.log(password, 'password');
      //   bcrypt.hash(password, salt, (err, hash) => {
      //     const value = { password: hash };
      //     const { insertedId } = server.plugins.mongodb.UserKyrios.insertOne(value);
      //     return { ...value, _id: insertedId }
      //   });
      // });


      const value = { firstname, lastname, email, password };

      console.log(value, 'value');

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
