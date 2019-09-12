import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Establishement {
    _id: ObjectId!
    name: String!
    street: String!
    cp: String!
    phone: String!
  }
`;
