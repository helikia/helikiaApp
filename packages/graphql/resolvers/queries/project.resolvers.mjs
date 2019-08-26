import { client, singleDocumentResolver } from './global.resolvers';

export default {
  client,
  projectManager: singleDocumentResolver('projectManagerId', 'userLoader'),
  nbOfParticipant: ({ _id: projectId }, _, { loaders }) => loaders.projectParticipantsLoader.load(projectId),
  totalPrice: async ({ type, price, estimations }) => {
    if (type !== 'vModel') {
      return price;
    }

    return estimations
      ? estimations.reduce((sum, { dailyFee, numberOfDays }) => sum + dailyFee * numberOfDays, 0)
      : 0;
  },
  isManagedByMe: ({ projectManagerId }, _, { credentials }) => (
    !!projectManagerId && projectManagerId.toString() === credentials._id.toString()
  ),
};
