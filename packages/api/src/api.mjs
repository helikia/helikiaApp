import Glue from 'glue';
import config from '../../config/server';

import mongodbPlugin from './modules/mongodb/mongodb.plugin';
import helikiaPlugin from './modules/helikia/helikia.plugin';
import graphQlPlugin from './modules/graphql/graphql.plugin';

const manifest = {
  server: config.server,
  register: {
    plugins: [{
      plugin: 'good',
      options: {
        reporters: {
          consoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', error: '*' }],
          }, {
            module: 'good-console',
            args: [config.logs],
          }, 'stdout'],
        },
      },
    }, {
      plugin: mongodbPlugin,
      options: config.mongodb,
    },
    {
      plugin: helikiaPlugin,
    },
    {
      plugin: graphQlPlugin,
    }],
  },
};

const createServer = async () => {
  const server = await Glue.compose(manifest);
  await server.start();
  server.log('info', `Graphql started on ${process.env.APP_ENV}:${server.info.port}/graphql`);
  server.log('info', `Server started on port ${server.info.port}`);
};

createServer()
// eslint-disable-next-line no-console
  .catch(e => console.error(e));
