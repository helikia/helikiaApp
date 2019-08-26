import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input EstimationInput {
    skill: String!
    level: String!
    numberOfDays: Int!
    dailyFee: Float!
  }
`;
