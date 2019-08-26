import clientMutations from './mutations/client.mutations';
import projectMutations from './mutations/project.mutations';
import staffingMutations from './mutations/staffing.mutations';
import vacationMutations from './mutations/vacation.mutations';
import transportReceiptMutations from './mutations/transportReceipt.mutations';
import lunchMutations from './mutations/lunch.mutations';
import worklogMutations from './mutations/worklog.mutations';
import billMutations from './mutations/bill.mutations';

export default {
  ...clientMutations,
  ...projectMutations,
  ...staffingMutations,
  ...vacationMutations,
  ...transportReceiptMutations,
  ...lunchMutations,
  ...worklogMutations,
  ...billMutations,
};
