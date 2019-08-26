import ApolloServerHapi from 'apollo-server-hapi';
import DataLoader from 'dataloader';
import mongodb from 'mongodb';
import helpers from '@arborescence/helpers';
import momentTz from 'moment-timezone';

import typeDefs from './definitions/typeDefs';
import Query from './resolvers/query.resolvers';
import User from './resolvers/queries/user.resolvers';
import Staffing from './resolvers/queries/staffing.resolvers';
import Client from './resolvers/queries/client.resolvers';
import Lunch from './resolvers/queries/lunch.resolvers';
import Project from './resolvers/queries/project.resolvers';
import Vacation from './resolvers/queries/vacation.resolvers';
import Estimation from './resolvers/queries/estimation.resolvers';
import TransportReceipt from './resolvers/queries/transportReceipt.resolvers';
import Worklog from './resolvers/queries/worklog.resolvers';
import WorklogEntry from './resolvers/queries/worklogEntry.resolvers';
import Mutation from './resolvers/mutation.resolvers';
import DateScalar from './scalars/date.scalar';
import ObjectIdScalar from './scalars/objectId.scalar';

const resolvers = {
  Query,
  Client,
  User,
  Mutation,
  Project,
  Staffing,
  Lunch,
  Estimation,
  TransportReceipt,
  Vacation,
  Worklog,
  WorklogEntry,
  Date: DateScalar,
  ObjectId: ObjectIdScalar,
  Upload: ApolloServerHapi.GraphQLUpload,
};

const buildDataLoader = ({ server, auth }) => (collection, { skipCompanyId } = {}) => new DataLoader(
  async (keys) => {
    const results = await server.plugins.mongodb[collection].find({
      _id: { $in: keys.map(id => new mongodb.ObjectID(id.toString())) },
      companyId: skipCompanyId ? undefined : auth.credentials.companyId,
    }).toArray();
    return keys.map(key => results.find(result => result._id.toString() === key.toString()));
  },
);

const buildSlugDataLoader = ({ server, auth }, loaders) => (collection, loader) => new DataLoader(
  async (slugs) => {
    const results = await server.plugins.mongodb[collection].find({
      slug: { $in: slugs },
      companyId: auth.credentials.companyId,
    }).toArray();
    results.forEach(result => loaders[loader].prime(result._id.toString(), result));
    return slugs.map(slug => results.find(result => result.slug === slug));
  },
);

export default {
  name: 'graphql-server',
  async register(server) {
    const gqlServer = new ApolloServerHapi.ApolloServer({
      typeDefs,
      resolvers,
      async context({ request }) {
        const { auth: { credentials } } = request;
        const createLoader = buildDataLoader(request);

        const { timezone } = await server.plugins.mongodb.Company.findById(credentials.companyId);
        const moment = (...args) => momentTz(...args).tz(timezone);

        const loadersByDate = {};
        const withLoaderByDate = (name, loadingFunc) => (date) => {
          const key = `${name}:${date.getMonth()}:${date.getFullYear()}`;
          loadersByDate[key] = loadersByDate[key] || new DataLoader(loadingFunc.bind(null, date));
          return loadersByDate[key];
        };

        const loaders = {
          companyLoader: createLoader('Company', { skipCompanyId: true }),
          userLoader: createLoader('User'),
          clientLoader: createLoader('Client'),
          projectLoader: createLoader('Project'),
          vacationLoader: createLoader('Vacation'),
          lunchLoader: createLoader('Lunch'),
          projectParticipantsLoader: new DataLoader(async (keys) => {
            const results = await server.plugins.mongodb.Staffing.find({
              projectId: { $in: keys },
              companyId: credentials.companyId,
            }).toArray();
            return keys.map(key => results.filter(result => result.projectId.toString() === key.toString()).length);
          }),
          transportReceiptFilesLoader: new DataLoader(async (keys) => {
            const results = await server.plugins.mongodb.TransportReceiptGrid.find({
              _id: { $in: keys },
            }).toArray();
            return keys.map(key => results.find(result => result._id.toString() === key.toString()));
          }),
          worklogBlockLoader: withLoaderByDate('worklogBlock', async (date, keys) => {
            const blocks = await server.plugins.mongodb.WorklogBlock.find({
              userId: { $in: keys },
              date,
            }).toArray();
            return keys.map(key => blocks.find(block => block.userId.toString() === key.toString()));
          }),
          billingLoader: withLoaderByDate('billing', async (date, keys) => {
            const bills = await server.plugins.mongodb.Bill.find({
              staffingId: { $in: keys },
              date: { $eq: date },
            }).toArray();
            return keys.map(key => bills.find(bill => bill.staffingId.toString() === key.toString()));
          }),
          worklogEntriesLoader: withLoaderByDate('worklogEntries', async (date, keys) => {
            const momentDate = moment(date);
            const entries = await server.plugins.mongodb.WorklogEntry.find({
              userId: { $in: keys },
              date: {
                $gte: helpers.getFirstOfMonth(momentDate),
                $lte: helpers.getLastOfMonth(momentDate),
              },
            }).toArray();
            return keys.map(key => entries.filter(entry => entry.userId.toString() === key.toString()));
          }),
        };
        const createSlugLoader = buildSlugDataLoader(request, loaders);
        const slugLoaders = {
          clientBySlugLoader: createSlugLoader('Client', 'clientLoader'),
          projectBySlugLoader: createSlugLoader('Project', 'projectLoader'),
        };

        return {
          credentials,
          server,
          loaders: { ...loaders, ...slugLoaders },
          moment,
        };
      },
    });

    // eslint-disable-next-line no-param-reassign
    server.app.gqlServer = gqlServer;

    await gqlServer.applyMiddleware({ app: server });
    await gqlServer.installSubscriptionHandlers(server.listener);
    server.events.on('start', () => server.log('info', `GraphQL endpoint mounted on ${gqlServer.graphqlPath}`));
  },
};
