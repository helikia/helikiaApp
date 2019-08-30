import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    role: String!
  }
`;
