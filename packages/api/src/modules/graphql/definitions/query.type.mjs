import ApolloServerHapi from 'apollo-server-hapi';

import Establishement from './types/establishement.type';
import User from './types/user.type';

export default ApolloServerHapi.gql`
  ${Establishement}

  type Query {
    establishement: [Establishement]
  }
`;
