export default {
  name: 'helikia',
  dependencies: ['mongodb'],
  async register(server) {
    server.plugins.mongodb.registerModel('User');
    server.plugins.mongodb.registerModel('Establishement');
  },
};
