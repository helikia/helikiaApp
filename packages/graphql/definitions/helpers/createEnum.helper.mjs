import ApolloServerHapi from 'apollo-server-hapi';

const createEnum = (enumName, enumValues) => ApolloServerHapi.gql`
  enum ${enumName} {
    ${enumValues.join('\n')}
  }
`;

export default createEnum;
