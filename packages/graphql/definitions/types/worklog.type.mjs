import ApolloServerHapi from 'apollo-server-hapi';

export default ApolloServerHapi.gql`
  type Worklog {
    date: Date!
    user: User!
    projects: [Project!]!
    staffings(date: Date!): [Staffing!]!
    vacations(date: Date!): [Vacation!]!
    entries(date: Date!): [WorklogEntry!]!
    validation(date: Date!): WorklogBlock
  }
`;
