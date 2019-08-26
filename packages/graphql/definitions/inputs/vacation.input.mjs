import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input PeriodInput {
    type: PeriodType!
    startDate: Date!
    endDate: Date!
  }

  input EditVacationInput {
    title: String!
    comment: String
    periods: [PeriodInput!]!
  }

  input AddVacationInput {
    title: String!
    comment: String
    periods: [PeriodInput!]!
    userId: ObjectId
  }
`;
