import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input EditLunchInput {
    _id: ObjectId!
    name: String!
    date: Date!
    attendeeIds: [ObjectId!]!
  }

  input AddLunchInput {
    name: String!
    date: Date!
    attendeeIds: [ObjectId!]!
  }
`;
