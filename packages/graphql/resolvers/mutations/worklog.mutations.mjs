import uniqBy from 'lodash/uniqBy';
import ApolloServerHapi from 'apollo-server-hapi';
import helpers from '@arborescence/helpers';

const { isDayOff, getOpeningDays, getFirstOfMonth, getLastOfMonth } = helpers;
const { UserInputError } = ApolloServerHapi;

export default {
  saveWorklog: async (_, { date, entries }, { server, credentials, moment }) => {
    const momentDate = moment(date);
    const firstOfMonth = getFirstOfMonth(momentDate);
    const lastOfMonth = getLastOfMonth(momentDate);

    const expectedDays = getOpeningDays(momentDate);
    const total = entries.reduce((sum, entry, i) => {
      if (entry.date > lastOfMonth || entry.date < firstOfMonth) {
        throw new UserInputError('entryOutOfRange', { invalidArgs: [`entries[${i}].date`] });
      }
      if (isDayOff(moment(entry.date))) {
        throw new UserInputError('invalidEntryDate', { invalidArgs: [`entries[${i}].date`] });
      }
      return sum + entry.occupancyRate;
    }, 0);

    if (total > expectedDays) {
      throw new UserInputError('expectDaysExceeded', { invalidArgs: ['entries'] });
    }

    const block = await server.plugins.mongodb.WorklogBlock.findOne({
      userId: credentials._id,
      date,
    });

    if (block) {
      throw new UserInputError('worklogAlreadyValidated', { invalidArgs: ['date'] });
    }

    const projectIds = uniqBy(entries.map(entry => entry.projectId), String);
    const count = await server.plugins.mongodb.Project.countDocuments({ _id: { $in: projectIds } });

    if (projectIds.length !== count) {
      throw new UserInputError('invalidProject', { invalidArgs: ['entries'] });
    }

    // TODO: Backend check for vacation overlap

    await server.plugins.mongodb.WorklogEntry.deleteMany({
      userId: credentials._id,
      date: { $gte: firstOfMonth, $lte: lastOfMonth },
    });

    let finalEntries = entries;
    if (entries.length > 0) {
      finalEntries = entries.map(entry => ({
        ...entry,
        userId: credentials._id,
        companyId: credentials.companyId,
      }));
      await server.plugins.mongodb.WorklogEntry.insertMany(finalEntries);
    }

    return finalEntries;
  },

  validateWorklog: async (_, { date }, { server, credentials: { _id: userId, companyId } }) => {
    const blocker = await server.plugins.mongodb.WorklogBlock.findOne({
      userId,
      date,
    });

    if (blocker) {
      throw new UserInputError('worklogAlreadyValidated', { invalidArgs: ['date'] });
    }

    const block = {
      userId,
      date,
      validationDate: new Date(),
      companyId,
    };

    const { insertedId } = await server.plugins.mongodb.WorklogBlock.insertOne(block);

    return { ...block, _id: insertedId };
  },
};
