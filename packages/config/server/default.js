module.exports = {
  // server: {
  //   port: process.env.PORT || 5000,
  //   cache: {
  //     engine: 'catbox-redis',
  //     url: process.env.REDIS_URL || 'redis://localhost:6379',
  //     database: 0,
  //     partition: 'arborescence',
  //   },
  // },
  logs: {
    colors: true,
  },
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/helikia-app',
  },
  documents: {
    debugRoute: true,
  },
};
