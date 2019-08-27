import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type File {
    _id: ObjectId!
    filename: String!
    length: Int!
    md5: String!
    contentType: String!
    uploadDate: Date!
  }
`;
