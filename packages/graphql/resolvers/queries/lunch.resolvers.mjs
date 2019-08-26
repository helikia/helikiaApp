import { owner, multipleDocumentResolver } from './global.resolvers';

export default {
  owner,
  attendees: multipleDocumentResolver('attendeeIds', 'userLoader'),
  canEdit: (lunch, _, { credentials, moment, server }) => (
    server.plugins.arborescence.canEditLunch(lunch, credentials, moment)
  ),
};
