import ApolloServerHapi from 'apollo-server-hapi';

import Query from './query.type';
import Mutation from './mutation.type';

import DateScalar from '../scalars/date.scalar';
import ObjectIdScalar from '../scalars/objectId.scalar';

export default ApolloServerHapi.gql`
  scalar ${DateScalar}
  scalar ${ObjectIdScalar}

  ${Query}
  ${Mutation}
`;
