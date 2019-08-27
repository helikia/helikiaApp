import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Staffing {
    _id: ObjectId!
    userId: String!
    user: User!
    projectId: ObjectId!
    project: Project
    startDate: Date!
    endDate: Date!
    dailyFee: Float
    occupancyRate: Float!
    comment: String
    skill: String
    workedDays(date: Date!): Float!
    validated(date: Date!): Boolean!
    bill(date: Date!): Bill
  }
`;
