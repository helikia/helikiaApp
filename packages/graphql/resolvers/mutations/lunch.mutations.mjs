import ApolloServerHapi from 'apollo-server-hapi';

const { UserInputError } = ApolloServerHapi;

export default {
  addLunch: async (_, { lunch: { attendeeIds, ...lunch }, ownerId }, { server, credentials, loaders }) => {
    let owner = credentials;
    if (ownerId) {
      owner = await loaders.userLoader.load(ownerId);
      if (!owner) {
        throw new UserInputError('invalidOwner', { invalidArgs: ['ownerId'] });
      }
    }

    const attendees = await loaders.userLoader.loadMany(attendeeIds);
    if (attendees.length !== attendeeIds.length) {
      throw new UserInputError('invalidAttendee', { invalidArgs: ['attendees'] });
    }

    const { _id, companyId } = owner;

    const finalLunch = {
      ...lunch,
      attendeeIds,
      creationDate: new Date(),
      ownerId: _id,
      companyId,
    };
    const { insertedId } = await server.plugins.mongodb.Lunch.insertOne(finalLunch);

    attendees.forEach(attendee => server.plugins.emails.send({
      template: 'addedToLunch',
      to: attendee.email,
      ownerFirstName: owner.firstName,
      lunchName: lunch.name,
      lunchDate: lunch.date,
    }));

    return { ...finalLunch, _id: insertedId, owner, attendees };
  },

  editLunch: async (_, { lunch }, { server, credentials, moment }) => {
    const oldLunch = await server.plugins.mongodb.Lunch.findById(lunch._id);

    if (!oldLunch) {
      throw new UserInputError('invalidLunch', { invalidArgs: ['lunch._id'] });
    }

    if (!server.plugins.arborescence.canEditLunch(oldLunch, credentials, moment)) {
      throw new UserInputError('editDeadlineReached', { invalidArgs: ['lunch._id'] });
    }

    await server.plugins.mongodb.Lunch.updateOne(
      { _id: lunch._id },
      { $set: lunch },
    );

    return { ...oldLunch, ...lunch };
  },
};
