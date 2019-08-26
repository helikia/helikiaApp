import mongodb from 'mongodb';
import fixtures from './db.json';

export default {
  name: 'loadFixtures',
  async register(server, options) {
    const client = await mongodb.MongoClient.connect(options.url, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.log('info', `Database connected to: ${options.url}`);

    const db = client.db();
    server.log('db');
    // insert document to 'users' collection using insertOne
    db.collection('Etablishement').insertOne(fixtures, (err, res) => {
      if (err) throw err;
      console.log('Document inserted');
      // close the connection to db when you are done with it
      db.close();
    });

    server.events.on('stop', () => client.close());
  },
};
