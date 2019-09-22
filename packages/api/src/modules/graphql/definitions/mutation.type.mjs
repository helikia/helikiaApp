import ApolloServerHapi from 'apollo-server-hapi';

import UserKyriosInput from './inputs/userKyrios.input';

export default ApolloServerHapi.gql`
  ${UserKyriosInput}

  type Mutation {
    upsertUserKyrios(firstname: String!, lastname: String!, email: String!, password: String!, creationDate: String!, role: String!): UserKyrios
    signinUserKyrios(email: String!, password: String!): Token!
    editUser (firstname: String!, lastname: String!, email: String!, password: String!, creationDate: String!, role: String!): UserKyrios
    deleteUser (email: String!): UserKyrios
  }
`;
