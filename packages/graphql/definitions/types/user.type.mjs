import ApolloServerHapi from 'apollo-server-hapi';
import config from '@arborescence/config/server';

import createEnum from '../helpers/createEnum.helper';

export default ApolloServerHapi.gql`
  ${createEnum('UserSkill', config.users.skills)}
  ${createEnum('UserLevel', config.users.levels)}

  type User {
    _id: ObjectId
    firstName: String
    lastName: String
    profilePictureUrl: String
    skills: [UserSkill]
    company: Company!
  }
`;
