import slugify from 'slug';

export default {
  upsertClient: async (parent, { client }, { server, credentials, loaders }) => {
    const owner = await loaders.userLoader.load(client.ownerId);
    if (!owner) {
      throw new Error('invalidUser');
    }
    if (!owner.skills.includes('business')) {
      throw new Error('userMissingSkill');
    }

    const { companyId } = credentials;

    const slug = slugify(client.name, { lower: true });
    const { value: updatedClient } = await server.plugins.mongodb.Client.findOneAndUpdate(
      { slug },
      { $set: { ...client, companyId, slug } },
      { upsert: true, returnOriginal: false },
    );
    return { ...updatedClient, owner };
  },
};
