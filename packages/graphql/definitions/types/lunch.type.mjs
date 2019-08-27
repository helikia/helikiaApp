import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Lunch {
    _id: ObjectId!
    ownerId: ObjectId!
    owner: User!
    name: String!
    attendees: [User!]!
    date: Date!
    creationDate: Date!
    canEdit: Boolean!
    attendeeIds: ObjectId!
  }
`;
