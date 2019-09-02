import mongodb from 'mongodb';
import fixtures from './fixtures/db.json';

export default {
  name: 'mongodb',
  async register(server, options) {
    const client = await mongodb.MongoClient.connect(options.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.log('info', `Database connected to: ${options.url}`);
    const db = client.db();

    // db.collection('Etablishement').insertOne(fixtures, (err, res) => {
    //   if (err) throw err;
    //   console.log('Document inserted');
    // });

    server.expose('registerModel', (name) => {
      server.expose(name, new Proxy({}, {
        get: (_, operation) => {
          if (operation === 'findById') {
            return id => db.collection(name).findOne({ _id: new mongodb.ObjectID() });
          }

          return (...args) => db.collection(name)[operation](...args);
        },
      }));
    });

    server.events.on('stop', () => client.close());
  },
};
