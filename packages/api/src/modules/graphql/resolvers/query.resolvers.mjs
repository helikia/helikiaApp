import lodash from 'lodash';

const resolveList = collection => async (_, args,{ server, credentials },
) => (
  server.plugins.mongodb[collection].find().toArray()
);

export default {
  etablishement: resolveList('etablishement'),
};
