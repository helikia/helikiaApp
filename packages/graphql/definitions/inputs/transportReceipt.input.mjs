import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input UploadTransportReceiptInput {
    userId: ObjectId
    file: Upload!
    startDate: Date!
    endDate: Date!
    comment: String
  }
  
  input EditTransportReceiptInput {
    _id: ObjectId!
    file: Upload
    startDate: Date
    endDate: Date
    comment: String
  }
`;
