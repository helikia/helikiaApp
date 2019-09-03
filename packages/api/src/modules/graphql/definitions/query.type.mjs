import ApolloServerHapi from 'apollo-server-hapi';

import Establishement from './types/establishement.type';
import User from './types/user.type';

export default ApolloServerHapi.gql`
  ${Establishement}
  ${User}

  type Query {
    me: User
    allEstablishements: [Establishement]
  }
`;
