import { singleDocumentResolver } from './global.resolvers';

export default {
  user: singleDocumentResolver('userId', 'userLoader'),
};
