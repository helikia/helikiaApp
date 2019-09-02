module.exports = {
  server: {
    port: process.env.PORT || 5000,
  },
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
