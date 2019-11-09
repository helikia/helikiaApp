import getStaticFiles from './routes/getStaticFiles.route';

export default {
  name: 'helikia',
  dependencies: ['mongodb'],
  async register(server) {
    server.plugins.mongodb.registerModel('UserKyrios');
    server.plugins.mongodb.registerModel('Establishement');

    server.route([
      getStaticFiles,
    ]);
  },
};
