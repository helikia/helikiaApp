module.exports = {
  server: {
    port: 5000,
  },
  logs: {
    colors: true,
  },
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/helikia-app',
  }
};
