import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Company {
    _id: ObjectId
    name: String
    address: Address
    websiteUrl: String
    timezone: String
  }
`;
