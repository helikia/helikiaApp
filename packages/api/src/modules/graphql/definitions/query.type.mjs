import ApolloServerHapi from 'apollo-server-hapi';

import Etablishement from './types/etablishement.type';
import User from './types/user.type';

export default ApolloServerHapi.gql`
  ${Etablishement}

  type Query {
    etablishement: [Etablishement]
  }
`;
