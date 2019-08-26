import { singleDocumentResolver } from './global.resolvers';

export default {
  user: singleDocumentResolver('userId', 'userLoader'),
  project: singleDocumentResolver('projectId', 'projectLoader'),
  validated: async ({ userId }, { date }, { loaders }) => !!(await loaders.worklogBlockLoader(date).load(userId)),
  bill: ({ _id }, { date }, { loaders }) => loaders.billingLoader(date).load(_id),
  workedDays: async ({ userId, projectId, startDate, endDate }, { date }, { loaders }) => (
    (await loaders.worklogEntriesLoader(date).load(userId))
      .filter(entry => (
        (entry.date >= startDate && entry.date <= endDate)
          && entry.projectId.toString() === projectId.toString()
      ))
      .reduce((sum, { occupancyRate }) => sum + occupancyRate, 0)
  ),
};
