import lodash from 'lodash';

const { identity, omit } = lodash;

const resolveById = (loader, omitted = []) => async (_, { _id }, { loaders }) => omit(
  await loaders[loader].load(_id), omitted,
);

const resolveBySlug = (collection, { transformQuery = identity } = {}) => (
  async (_, { slug }, { server, credentials }) => (
    server.plugins.mongodb[collection].findOne(await transformQuery({
      slug,
      companyId: credentials.companyId,
    }))
  )
);

const resolveList = (
  collection,
  { transformQuery = identity, transformOptions = identity },
) => async (
  _,
  args,
  { server, credentials },
) => (
  server.plugins.mongodb[collection]
    .find(
      await transformQuery({ companyId: credentials.companyId }, args, credentials, server),
      transformOptions({}, args),
    ).toArray()
);

export default {
  allClients: resolveList('Client', { transformOptions: options => ({ ...options, sort: [['name', 1]] }) }),

  client: resolveBySlug('Client'),

  project: resolveBySlug('Project'),

  vacation: resolveById('vacationLoader'),

  lunch: resolveById('lunchLoader'),

  checkExistingClient: async (_, { name }, { server, credentials }) => server.plugins.arborescence
    .checkClientDuplicate(server, credentials.companyId, name),

  checkExistingProject: async (_, { name, clientId }, { server, credentials }) => server.plugins.arborescence
    .checkProjectDuplicate(server, credentials.companyId, name, clientId),

  allUsers: resolveList('User', {
    transformQuery: (query, { job, search }) => {
      const searchQuery = search
        ? { $regex: new RegExp(search.split(' ').filter(s => s).join('|'), 'i') }
        : {};

      return ({
        ...query,
        ...(job ? { skills: { $elemMatch: { $eq: job } } } : {}),
        ...(search ? {
          $or: [{ firstName: searchQuery }, { lastName: searchQuery }],
        } : {}),
      });
    },
    transformOptions: (options, { search }) => ({
      ...options,
      sort: [['lastName', 1], ['firstName', 1]],
      ...(search ? { $limit: 5 } : {}),
    }),
  }),

  allProjects: resolveList('Project', {
    transformQuery: async (query, { clientId, archived }) => {
      const finalQuery = { ...query };
      if (clientId) {
        finalQuery.clientId = clientId;
      }
      if (typeof archived === 'boolean') {
        if (archived) {
          finalQuery.endDate = { $lt: new Date() };
        } else {
          finalQuery.$or = [{ endDate: { $gte: new Date() } }, { endDate: { $eq: null } }];
        }
      }
      return finalQuery;
    },
    transformOptions: options => ({ ...options, sort: [['name', 1]] }),
  }),

  allPersonalProjects: (_, __, { server, credentials }) => server.plugins.arborescence
    .getPersonalProjects(server, credentials, { excludeConsulting: true }),

  allStaffings: resolveList('Staffing', {
    transformQuery: (query, { projectId }) => ({ ...query, projectId }),
    transformOptions: options => ({ ...options, sort: [['startDate', 1]] }),
  }),

  allConsultings: async (_, { date }, { server, credentials: { companyId }, moment }) => {
    const momentDate = moment(date);

    const staffings = await server.plugins.mongodb.Staffing.find({
      startDate: { $lte: momentDate.date(momentDate.daysInMonth()).toDate() },
      endDate: { $gte: moment(date).date(1).toDate() },
      companyId,
    }).toArray();
    const projects = await server.plugins.mongodb.Project.find({
      _id: { $in: staffings.map(staffing => staffing.projectId) },
      type: 'consulting',
    }).toArray();

    return staffings
      .map(staffing => ({
        ...staffing,
        project: projects.find(project => project._id.toString() === staffing.projectId.toString()),
      }))
      .filter(staffing => !!staffing.project);
  },

  allVacations: resolveList('Vacation', {
    transformQuery: (query, { userId, personal }, { _id }) => {
      const uid = personal ? _id : userId;
      return {
        ...query,
        ...(uid ? { userId: uid } : undefined),
      };
    },
    transformOptions: options => ({ ...options, sort: [['date', -1]] }),
  }),

  allTransportReceipts: resolveList('TransportReceipt', {
    transformQuery: (query, { userId, personal }, { _id }) => {
      const uid = personal ? _id : userId;
      return {
        ...query,
        ...(uid ? { userId: uid } : undefined),
      };
    },
    transformOptions: options => ({ ...options, sort: [['uploadDate', -1]] }),
  }),

  allLunches: resolveList('Lunch', {
    transformQuery: (query, { ownerId, personal }, { _id }) => {
      const uid = personal ? _id : ownerId;
      if (!uid) {
        return query;
      }
      return {
        ...query,
        $or: [{ ownerId: uid }, { attendeeIds: { $elemMatch: { $eq: uid } } }],
      };
    },
    transformOptions: options => ({ ...options, sort: [['creationDate', -1]] }),
  }),

  allWorklogEntries: resolveList('WorklogEntry', {
    transformQuery: (query, { projectId }) => ({
      ...query,
      ...(projectId && { projectId }),
    }),
    transformOptions: options => ({ ...options, sort: [['date', -1]] }),
  }),

  worklog: async (_, { date }, { credentials, server }) => {
    const projects = await server.plugins.arborescence
      .getPersonalProjects(server, credentials, { date });

    return {
      date,
      projects,
      user: credentials,
    };
  },

  me: (_, args, { credentials }) => credentials,
};
