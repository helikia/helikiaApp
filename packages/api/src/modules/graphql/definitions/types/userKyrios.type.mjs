import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type UserKyrios {
    _id: ObjectId!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    creationDate: String!
    role: String!
  }
`;
