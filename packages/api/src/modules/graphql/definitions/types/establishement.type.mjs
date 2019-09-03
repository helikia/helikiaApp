import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Establishement {
    _id: ID!
    name: String!
    street: String!
    cp: String!
    phone: String!
  }
`;
