import mongodbPlugin from './modules/mongodb/mongodb.plugin';
import config from '../../config/server';

const manifest = {
  server: config.server,
  register: {
    plugins: [{
      plugin: mongodbPlugin,
      options: config.mongodb,
    }],
  },
};

const createServer = async () => {
  const server = await Glue.compose(manifest);
  await server.start();
  server.log('info', `Using ${process.env.APP_ENV} configuration`);
  server.log('info', `Server started on port ${server.info.port}`);
};

createServer()
// eslint-disable-next-line no-console
  .catch(e => console.error(e));
