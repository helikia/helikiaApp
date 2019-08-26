const foogereLogo = require('./logos/foogere-logo.svg');
const obouleauLogo = require('./logos/obouleau-logo.svg');

module.exports = {
  defaultRoute: 'bambooHome',
  defaultApp: { id: 'arborescence', name: 'Arborescence', logo: obouleauLogo },
  apps: [
    { id: 'foogere', name: 'Foogère', color: '#2ab280', route: 'foogere', logo: foogereLogo },
    { id: 'obouleau', name: 'Bamboo', color: '#0d7293', route: 'bamboo', logo: obouleauLogo },
  ],
};
