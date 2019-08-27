import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input AddBillInput {
    date: Date!
    staffingId: ObjectId!
  }
`;
