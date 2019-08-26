import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type WorklogEntry {
    _id: ObjectId!
    date: Date!
    userId: ObjectId!
    user: User!
    projectId: ObjectId!
    project: Project!
    occupancyRate: Float!
    billedOccupancyRate: Float!
    comment: String
  }
`;
