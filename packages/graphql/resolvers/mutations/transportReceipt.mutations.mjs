import path from 'path';
import util from 'util';
import ApolloServerHapi from 'apollo-server-hapi';

const { UserInputError } = ApolloServerHapi;

const uploadFile = async (server, receipt, user, file, moment) => {
  const { filename, stream } = await file;

  const fileExt = path.extname(filename);
  const date = moment(receipt.startDate).format('YYYY-MM-DD');
  const writeStream = server.plugins.mongodb.TransportReceiptGrid.openUploadStream(
    `${date}_${user.lastName}_${user.firstName}.${fileExt}`,
  );

  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on('end', resolve);
    writeStream.on('error', reject);
  });
  return writeStream;
};

export default {
  uploadTransportReceipt: async (parent, { transportReceipt }, { server, credentials, loaders, moment }) => {
    let user = credentials;
    if (transportReceipt.userId) {
      user = await loaders.userLoader.load(transportReceipt.userId);
      if (!user) {
        throw new Error('invalidUser');
      }
    }

    const { companyId } = credentials;
    const { file, ...receipt } = transportReceipt;

    const writeStream = await uploadFile(server, receipt, user, file, moment);

    const finalTransportReceipt = {
      ...transportReceipt,
      companyId,
      fileId: writeStream.id,
      userId: user._id,
      uploadDate: new Date(),
    };
    const { insertedId } = await server.plugins.mongodb.TransportReceipt.insertOne(finalTransportReceipt);
    return { ...finalTransportReceipt, _id: insertedId };
  },

  editTransportReceipt: async (_, { transportReceipt }, { server, credentials, moment }) => {
    const { _id, file, ...receipt } = transportReceipt;
    const oldTransportReceipt = await server.plugins.mongodb.TransportReceipt.findById(_id);

    if (!oldTransportReceipt) {
      throw new UserInputError('invalidTransportReceiptId', { invalidArgs: ['transportReceipt._id'] });
    }

    if (!server.plugins.arborescence.canEditTransportReceipt(receipt, credentials, moment)) {
      throw new UserInputError('editDeadlineReached', { invalidArgs: ['receipt._id'] });
    }

    if (file) {
      await util.promisify(server.plugins.mongodb.TransportReceiptGrid.delete)(oldTransportReceipt.fileId);

      const user = await server.plugins.mongodb.User.findById(receipt.userId);
      const writeStream = await uploadFile(server, receipt, user, file, moment);
      // eslint-disable-next-line no-param-reassign
      receipt.fileId = writeStream.id;
    }

    await server.plugins.mongodb.TransportReceipt.updateOne(
      { _id },
      { $set: receipt },
    );

    return { ...oldTransportReceipt, ...receipt };
  },
};
