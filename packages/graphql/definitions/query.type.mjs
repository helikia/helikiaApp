import ApolloServerHapi from 'apollo-server-hapi';

import Address from './types/address.type';
import Client from './types/client.type';
import Company from './types/company.type';
import Project from './types/project.type';
import Staffing from './types/staffing.type';
import User from './types/user.type';
import Lunch from './types/lunch.type';
import Vacation from './types/vacation.type';
import Worklog from './types/worklog.type';
import WorklogEntry from './types/worklogEntry.type';
import WorklogBlock from './types/worklogBlock.type';
import Bill from './types/bill.type';
import TransportReceipt from './types/transportReceipt.type';
import File from './types/file.type';

export default ApolloServerHapi.gql`
  ${File}
  ${Address}
  ${Client}
  ${Company}
  ${Project}
  ${Staffing}
  ${User}
  ${Lunch}
  ${Vacation}
  ${WorklogEntry}
  ${WorklogBlock}
  ${Bill}
  ${Worklog}
  ${TransportReceipt}

  type Query {
    me: User
    allClients: [Client]
    client(slug: String!): Client
    checkExistingClient(name: String!): Boolean
    checkExistingProject(name: String, clientId: ObjectId!): Boolean
    allUsers(job: String, search: String): [User]
    allProjects(clientId: ObjectId, archived: Boolean): [Project]
    allPersonalProjects: [Project]
    allStaffings(projectId: ObjectId!): [Staffing]
    allConsultings(date: Date!, search: String): [Staffing]
    allVacations(userId: ObjectId, personal: Boolean): [Vacation]
    allTransportReceipts(userId: ObjectId, personal: Boolean): [TransportReceipt]
    allLunches(ownerId: ObjectId, personal: Boolean): [Lunch]
    allWorklogEntries(projectId: ObjectId): [WorklogEntry!]!
    project(slug: String!): Project
    vacation(_id: ObjectId!): Vacation
    lunch(_id: ObjectId!): Lunch
    worklog(date: Date!): Worklog!
  }
`;
