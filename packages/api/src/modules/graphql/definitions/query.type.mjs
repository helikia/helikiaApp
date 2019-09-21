import ApolloServerHapi from 'apollo-server-hapi';

import Establishement from './types/establishement.type';
import UserKyrios from './types/userKyrios.type';
import Token from './types/token.type';

export default ApolloServerHapi.gql`
  ${Establishement}
  ${UserKyrios}
  ${Token}

  type Query {
    me: [UserKyrios]
    allEstablishements: [Establishement]
    userKyrios: [UserKyrios]
    getUserKyrios (email: String): UserKyrios
  }
`;
