import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input AddressInput {
    address: String!
    zipCode: String!
    city: String!
    country: String!
  }
`;
