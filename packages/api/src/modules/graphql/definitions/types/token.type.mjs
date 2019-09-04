import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Token {
    token: String!
  }
`;
