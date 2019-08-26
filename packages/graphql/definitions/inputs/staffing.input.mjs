import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input AddStaffingInput {
    startDate: Date!
    endDate: Date!
    dailyFee: Float
    occupancyRate: Float!
    comment: String
    skill: UserSkill
    userId: ObjectId!
    projectId: ObjectId!
  }

  input EditStaffingInput {
    _id: ObjectId!
    startDate: Date!
    endDate: Date!
    dailyFee: Float
    occupancyRate: Float!
    comment: String
    skill: UserSkill
  }
`;
