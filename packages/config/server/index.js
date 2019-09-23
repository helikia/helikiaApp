/* eslint-disable global-require, import/no-dynamic-require */

const deepMerge = require('deepmerge');

const defaultConfig = require('./default');
const sharedConfig = require('../shared');

const requireConfigFile = path => require(`./${path}`);

let localConfig = {};
try {
  // eslint-disable-next-line import/no-unresolved
  localConfig = requireConfigFile('local');
} catch (e) {
  // Don't care
}

let envConfig = {};
try {
  envConfig = requireConfigFile(process.env.APP_ENV);
} catch (e) {
  // Don't care
}

let localEnvConfig = {};
try {
  localEnvConfig = requireConfigFile(`local-${process.env.APP_ENV}`);
} catch (e) {
  // Don't care
}

module.exports = (deepMerge.default || deepMerge).all([
  sharedConfig,
  defaultConfig,
  envConfig,
  localConfig,
  localEnvConfig,
]);
