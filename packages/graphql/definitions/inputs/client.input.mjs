import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  input ClientInput {
    name: String!
    ownerId: ObjectId!
    billingAddress: AddressInput!
    executionAddress: AddressInput!
    mailingAddress: AddressInput!
    billingTypes: [BillingType]!
    paymentPeriod: Int!
    comment: String
  }
`;
