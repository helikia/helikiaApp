import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Etablishement {
    _id: ID!
    name: String!
    cp: String!
    phone: String!
  }
`;
