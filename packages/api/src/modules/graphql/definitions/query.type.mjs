import ApolloServerHapi from 'apollo-server-hapi';

import Etablishement from './types/etablishement.type';

export default ApolloServerHapi.gql`
  ${Etablishement}

  type Query {
    allEtablishements: [Etablishement]
  }
`;
