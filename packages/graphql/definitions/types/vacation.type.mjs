import ApolloServerHapi from 'apollo-server-hapi';
import config from '@arborescence/config/server';

import createEnum from '../helpers/createEnum.helper';

export default ApolloServerHapi.gql`
  ${createEnum('PeriodType', config.vacations.types)}
  ${createEnum('VacationStatus', config.vacations.statuses)}

  type Period {
    type: PeriodType!
    startDate: Date!
    endDate: Date!
  }

  type Vacation {
    _id: ObjectId!
    title: String!
    comment: String
    date: Date
    status: VacationStatus
    periods: [Period!]!
    userId: ObjectId!
    user: User!
  }
`;
