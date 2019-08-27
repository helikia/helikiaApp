import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Bill {
    _id: ObjectId
    creationDate: Date
    sentDate: Date
    staffingId: ObjectId!
    staffing: Staffing!
  }
`;
