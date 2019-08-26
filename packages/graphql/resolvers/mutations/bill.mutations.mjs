import ApolloServerHapi from 'apollo-server-hapi';

const { UserInputError } = ApolloServerHapi;

export default {
  createBill: async (_, { bill }, { server }) => {
    const staffing = await server.plugins.mongodb.Staffing.findById(bill.staffingId);
    if (!staffing) {
      throw new UserInputError('invalidStaffing', { invalidArgs: ['staffingId'] });
    }

    if (await server.plugins.mongodb.Bill.countDocuments({ staffingId: bill.staffingId, date: bill.date })) {
      throw new UserInputError('alreadyBilled', { invalidArgs: ['staffingId', 'date'] });
    }

    const finalBill = { ...bill, creationDate: new Date() };
    const { insertedId } = await server.plugins.mongodb.Bill.insertOne(finalBill);
    return { ...finalBill, _id: insertedId };
  },
  markBillSent: async (_, { billId, sent }, { server }) => {
    const { value: bill } = await server.plugins.mongodb.Bill.findOneAndUpdate(
      { _id: billId },
      sent ? { $set: { sentDate: new Date() } } : { $unset: { sentDate: true } },
      { returnOriginal: false },
    );

    if (!bill) {
      throw new UserInputError('invalidBill', { invalidArgs: ['billId'] });
    }

    return bill;
  },
  deleteBill: async (_, { billId }, { server }) => {
    const { deletedCount } = await server.plugins.mongodb.Bill.deleteOne({ _id: billId });

    if (!deletedCount) {
      throw new UserInputError('invalidBill', { invalidArgs: ['billId'] });
    }

    return true;
  },
};
