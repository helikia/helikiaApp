import ApolloServerHapi from 'apollo-server-hapi';
import config from '@arborescence/config/server';

import createEnum from '../helpers/createEnum.helper';

export default ApolloServerHapi.gql`
  ${createEnum('ProjectType', config.projects.types)}

  type Estimation {
    skill: UserSkill!
    level: UserLevel!
    numberOfDays: Int!
    dailyFee: Float!
    totalPrice: Int!
  }

  type Project {
    _id: ObjectId!
    name: String!
    slug: String!
    type: ProjectType!
    comment: String
    company: Company!
    clientId: String!
    client: Client!
    estimatedPrice: Float
    totalPrice: Float
    projectManagerId: ObjectId
    projectManager: User
    startDate: Date
    endDate: Date
    nbOfParticipant: Int!
    estimations: [Estimation]
    isManagedByMe: Boolean,
  }
`;
