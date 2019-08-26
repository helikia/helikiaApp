import config from '@arborescence/config/server';

export default {
  addVacation: async (_, { vacation }, { server, credentials, loaders }) => {
    let user = credentials;
    if (vacation.userId) {
      user = await loaders.userLoader.load(vacation.userId);
      if (!user) {
        throw new Error('invalidUser');
      }
    }

    const { companyId } = credentials;

    const finalVacation = {
      ...vacation,
      companyId,
      date: new Date(),
      status: config.vacations.statuses[0],
      userId: user._id,
    };
    const { insertedId } = await server.plugins.mongodb.Vacation.insertOne(finalVacation);

    await server.plugins.mongodb.WorklogEntry.deleteMany({
      userId: user._id,
      $or: vacation.periods.map(period => ({ date: { $gte: period.startDate, $lte: period.endDate } })),
    });

    return { ...finalVacation, _id: insertedId };
  },

  editVacation: async (_, { vacation, vacationId }, { server }) => {
    const oldVacation = await server.plugins.mongodb.Vacation.findById(vacationId);

    if (!oldVacation) {
      throw new Error('invalidVacationId');
    }

    if (oldVacation.status !== config.vacations.statuses[0]) {
      throw new Error('vacationLocked');
    }

    await server.plugins.mongodb.Vacation.updateOne(
      { _id: vacationId },
      { $set: vacation },
    );

    await server.plugins.mongodb.WorklogEntry.deleteMany({
      userId: oldVacation.userId,
      $or: vacation.periods.map(period => ({ date: { $gte: period.startDate, $lte: period.endDate } })),
    });

    return { ...oldVacation, ...vacation };
  },

  changeVacationStatus: async (_, { status, vacationId }, { server }) => {
    const { value: editedVacation } = await server.plugins.mongodb.Vacation.findOneAndUpdate(
      { _id: vacationId },
      { $set: { status } },
      { returnOriginal: false },
    );

    if (!editedVacation) {
      throw new Error('invalidVacationId');
    }

    return editedVacation;
  },
};
