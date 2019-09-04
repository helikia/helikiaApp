import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input UserKyriosInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }
`;
