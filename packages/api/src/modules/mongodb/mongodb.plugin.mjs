import mongodb from 'mongodb';

export default {
  name: 'mongodb',
  async register(server, options) {
    const client = await mongodb.MongoClient.connect(options.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.log('info', `Database connected to: ${options.url}`);
    const db = client.db();

    server.expose('registerModel', (name) => {
      server.expose(name, db.collection(name));
    });

    server.events.on('stop', () => client.close());
  },
};
