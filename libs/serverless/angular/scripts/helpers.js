const camelify = require('camelify');
const configHelpers = require('../config-helpers');
const minimist = require('minimist');

const getResolveVariablesShim = (argv) => {
  const stage = argv.stage || 'nonprod';
  const package = require('../package.json');
  const service = camelify(package.name);
  const cname = package['prod-cname'] || 'www';
  const domain = (package.domain || { name: '{yourdomain.com}' }).name || '{yourdomain.com}';

  return (varName) => {
    return Promise.resolve({
      'self:provider.stage': stage,
      'self:custom.prod-CNAME': cname,
      'self:custom.domain-name': domain,
      'self:service': service
    }[varName]);
  }
}

const getArgs = () => {
  const argv = minimist(process.argv.slice(2));
  return argv;
}

module.exports = {
  ...configHelpers,
  getResolveVariablesShim,
  getArgs,
};