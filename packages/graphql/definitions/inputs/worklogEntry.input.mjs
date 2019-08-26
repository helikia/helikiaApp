import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input WorklogEntryInput {
    date: Date!
    projectId: ObjectId!
    occupancyRate: Float!
  }
`;
