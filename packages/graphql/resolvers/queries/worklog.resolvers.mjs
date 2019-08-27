import helpers from '@arborescence/helpers';
import config from '@arborescence/config';

const { getFirstOfMonth, getLastOfMonth } = helpers;

export default {
  entries: (_, { date }, { server, credentials, moment }) => server.plugins.mongodb.WorklogEntry.find({
    userId: credentials._id,
    date: { $gte: getFirstOfMonth(moment(date)), $lte: getLastOfMonth(moment(date)) },
  }).toArray(),

  vacations: (_, { date }, { server, credentials, moment }) => server.plugins.mongodb.Vacation.find({
    userId: credentials._id,
    status: { $ne: config.vacations.statuses[2] },
    periods: {
      $elemMatch: {
        startDate: { $lte: getLastOfMonth(moment(date)) },
        endDate: { $gte: getFirstOfMonth(moment(date)) },
      },
    },
  }).toArray(),

  staffings: (_, { date }, { server, credentials, moment }) => server.plugins.mongodb.Staffing.find({
    userId: credentials._id,
    startDate: { $lte: getLastOfMonth(moment(date)) },
    endDate: { $gte: getFirstOfMonth(moment(date)) },
  }).toArray(),

  validation: (_, { date }, { server, credentials }) => server.plugins.mongodb.WorklogBlock.findOne({
    userId: credentials._id,
    date,
  }),
};
