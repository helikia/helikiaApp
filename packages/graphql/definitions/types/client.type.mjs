import ApolloServerHapi from 'apollo-server-hapi';
import config from '@arborescence/config/server';

import createEnum from '../helpers/createEnum.helper';

export default ApolloServerHapi.gql`
  ${createEnum('BillingType', config.clients.billingTypes)}

  type Client {
    _id: ObjectId
    name: String
    ownerId: String!
    owner: User!
    billingAddress: Address
    executionAddress: Address
    mailingAddress: Address
    billingTypes: [BillingType]
    paymentPeriod: Int
    comment: String
    company: Company!
    slug: String
  }
`;
