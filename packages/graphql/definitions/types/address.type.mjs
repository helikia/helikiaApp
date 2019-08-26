import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Address {
    address: String
    zipCode: String
    city: String
    country: String
  }
`;
