import { singleDocumentResolver } from './global.resolvers';

export default {
  file: singleDocumentResolver('fileId', 'transportReceiptFilesLoader', 'file'),
  user: singleDocumentResolver('userId', 'userLoader'),
  canEdit: (transportReceipt, _, { credentials, moment, server }) => (
    server.plugins.arborescence.canEditTransportReceipt(transportReceipt, credentials, moment)
  ),
};
