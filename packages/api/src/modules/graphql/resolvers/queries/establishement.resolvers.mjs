export default {
  allEstablishements: (_, __, { server }) => server.plugins.mongodb.Establishement.find().toArray(),
};
