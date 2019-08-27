import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input ProjectInput {
    name: String!
    type: ProjectType!
    clientId: ObjectId!
    comment: String
    estimatedPrice: Float
    projectManagerId: ObjectId
    startDate: Date
    endDate: Date
  }
`;
