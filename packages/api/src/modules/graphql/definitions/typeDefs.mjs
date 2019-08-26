import ApolloServerHapi from 'apollo-server-hapi';

import Query from './query.type';

export default ApolloServerHapi.gql`
  ${Query}
`;
