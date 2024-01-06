// const camelify = require('camelify');
const { runProcess } = require('../config-helpers');
const { existsSync } = require('fs');
const { resolve } = require('path');
const minimist = require('minimist');

const getArgs = () => {
  const argv = minimist(process.argv.slice(2));
  return argv;
}

const exportServerless = async () => {
  return runProcess(`npx sls export --stage=${getArgs().stage}`, true);
}

let serverlessConfiguration = {
  stackName: 'unset',
  service: {
    name: 'unset'
  },
  envKey: 'unset',
  region: 'unset',
  awsAccessKeyId: 'none',
  awsSecretAccessKey: 'none',
}

let stackName = serverlessConfiguration.stackName;
let serviceName = serverlessConfiguration.service.name;
let envKey = serverlessConfiguration.envKey;
let region = serverlessConfiguration.region;
let awsAccessKeyId = serverlessConfiguration.awsAccessKeyId;
let awsSecretAccessKey = serverlessConfiguration.awsSecretAccessKey;
if (existsSync(resolve(__dirname, '../.service.config.json'))) {
  delete require.cache[resolve('../.service.config.json')];
  serverlessConfiguration = require('../.service.config.json');
  stackName = serverlessConfiguration.stackName;
  serviceName = serverlessConfiguration.service.name;
  envKey = serverlessConfiguration.envKey;
  region = serverlessConfiguration.region;
  awsAccessKeyId = serverlessConfiguration.awsAccessKeyId;
  awsSecretAccessKey = serverlessConfiguration.awsSecretAccessKey;
}

const packageJson = require('../package.json');
const cname = packageJson['prod-cname'] || 'www';
const domain = (packageJson.domain || { name: '{yourdomain.com}' }).name || '{yourdomain.com}';

module.exports = {
  awsAccessKeyId,
  awsSecretAccessKey,
  envKey,
  stackName,
  serviceName,
  cname,
  domain,
  region,
  exportServerless,
  getArgs,
  runProcess,
};