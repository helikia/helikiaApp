import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type WorklogBlock {
    date: Date!
    validationDate: Date!
  }
`;
