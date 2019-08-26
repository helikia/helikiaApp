import config from '@arborescence/config';
import ApolloServerHapi from 'apollo-server-hapi';

const { UserInputError } = ApolloServerHapi;

export default {
  addStaffing: async (_, { staffing }, { server, credentials, loaders }) => {
    const [project, user] = await Promise.all([
      loaders.projectLoader.load(staffing.projectId),
      loaders.userLoader.load(staffing.userId),
    ]);
    if (!project) {
      throw new UserInputError('invalidProject', { invalidArgs: ['staffing.projectId'] });
    }
    if (!user) {
      throw new UserInputError('invalidUser', { invalidArgs: ['staffing.userId'] });
    }
    if (config.projects.hasStaffingDailyFee.includes(project.type) && !staffing.dailyFee) {
      throw new UserInputError('missingDailyFee', { invalidArgs: ['staffing.dailyFee'] });
    }
    if (config.projects.hasStaffingSkill.includes(project.type) && !staffing.skill) {
      throw new UserInputError('missingSkill', { invalidArgs: ['staffing.skill'] });
    }

    if (await server.plugins.arborescence.checkStaffingOverlapping(staffing, server)) {
      throw new UserInputError('overlappingStaffing', { invalidArgs: ['staffing.startDate', 'staffing.endDate'] });
    }

    const { companyId } = credentials;

    const finalStaffing = {
      ...staffing,
      companyId,
    };
    const { insertedId } = await server.plugins.mongodb.Staffing.insertOne(finalStaffing);
    return { ...finalStaffing, _id: insertedId };
  },

  editStaffing: async (_, { staffing }, { server }) => {
    const oldStaffing = await server.plugins.mongodb.Staffing.findById(staffing._id);

    if (!oldStaffing) {
      throw new Error('invalidStaffingId');
    }

    const updatedStaffing = {
      ...oldStaffing,
      ...staffing,
    };

    const overlapses = await server.plugins.arborescence.checkStaffingOverlapping(updatedStaffing, server);
    if (overlapses) {
      throw new UserInputError('overlappingStaffing', { invalidArgs: ['staffing.startDate', 'staffing.endDate'] });
    }

    await server.plugins.mongodb.Staffing.updateOne(
      { _id: staffing._id },
      { $set: staffing },
    );

    return updatedStaffing;
  },
};
