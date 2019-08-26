export default {
  name: 'helikia',
  async register(server) {
    server.plugins.mongodb.registerModel('User');
    server.plugins.mongodb.registerModel('Establishement');
  },
};
