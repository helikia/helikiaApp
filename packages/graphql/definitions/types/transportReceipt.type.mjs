import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type TransportReceipt {
    _id: ObjectId!
    userId: String!
    user: User!
    startDate: Date!
    endDate: Date!
    uploadDate: Date!
    comment: String
    file: File
    canEdit: Boolean
  }
`;
