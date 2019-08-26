import slugify from 'slug';

export default {
  upsertProject: async (parent, { project }, { server, credentials }) => {
    const client = await server.plugins.mongodb.Client.findById(project.clientId);
    if (!client) {
      throw new Error('invalidClient');
    }

    const { companyId } = credentials;

    const slug = slugify(project.name, { lower: true });
    const { value: updatedProject } = await server.plugins.mongodb.Project.findOneAndUpdate(
      { slug, clientId: project.clientId },
      { $set: { ...project, companyId, slug } },
      { upsert: true, returnOriginal: false },
    );
    return updatedProject;
  },

  editEstimations: async (parent, { estimations, projectId }, { server }) => {
    const { value: project } = await server.plugins.mongodb.Project.findOneAndUpdate(
      { _id: projectId },
      { $set: { estimations } },
      { returnOriginal: false },
    );

    if (!project) {
      throw new Error('invalidProject');
    }

    return project;
  },
};
