import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input UserKyriosInput {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    creationDate: String!
    role: String!
  }
`;
