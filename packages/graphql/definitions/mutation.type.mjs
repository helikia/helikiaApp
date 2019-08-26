import ApolloServerHapi from 'apollo-server-hapi';

import AddressInput from './inputs/address.input';
import ClientInput from './inputs/client.input';
import EstimationInput from './inputs/estimation.input';
import ProjectInput from './inputs/project.input';
import StaffingInput from './inputs/staffing.input';
import VacationInput from './inputs/vacation.input';
import TransportReceiptInput from './inputs/transportReceipt.input';
import LunchInput from './inputs/lunch.input';
import WorklogEntryInput from './inputs/worklogEntry.input';
import BillInput from './inputs/bill.input';

export default ApolloServerHapi.gql`
  ${AddressInput}
  ${ClientInput}
  ${EstimationInput}
  ${ProjectInput}
  ${StaffingInput}
  ${VacationInput}
  ${TransportReceiptInput}
  ${LunchInput}
  ${WorklogEntryInput}
  ${BillInput}

  type Mutation {
    upsertClient(client: ClientInput!): Client
    upsertProject(project: ProjectInput!): Project
    addStaffing(staffing: AddStaffingInput!): Staffing
    editStaffing(staffing: EditStaffingInput!): Staffing
    editEstimations(estimations: [EstimationInput!], projectId: ObjectId!): Project
    addVacation(vacation: AddVacationInput!): Vacation
    editVacation(vacation: EditVacationInput!, vacationId: ObjectId!): Vacation
    changeVacationStatus(vacationId: ObjectId!, status: VacationStatus!): Vacation
    uploadTransportReceipt(transportReceipt: UploadTransportReceiptInput): TransportReceipt
    editTransportReceipt(transportReceipt: EditTransportReceiptInput): TransportReceipt
    addLunch(lunch: AddLunchInput!): Lunch
    editLunch(lunch: EditLunchInput!): Lunch
    saveWorklog(date: Date!, entries: [WorklogEntryInput!]!): [WorklogEntry!]!
    validateWorklog(date: Date!): WorklogBlock
    createBill(bill: AddBillInput): Bill!
    markBillSent(billId: ObjectId!, sent: Boolean!): Bill!
    deleteBill(billId: ObjectId!): Boolean!
  }
`;
