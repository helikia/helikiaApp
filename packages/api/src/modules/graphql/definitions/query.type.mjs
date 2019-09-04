import ApolloServerHapi from 'apollo-server-hapi';

import Establishement from './types/establishement.type';
import UserKyrios from './types/userKyrios.type';

export default ApolloServerHapi.gql`
  ${Establishement}
  ${UserKyrios}

  type Query {
    me: [UserKyrios]
    allEstablishements: [Establishement]
    allUserKyrios: [UserKyrios]
  }
`;
