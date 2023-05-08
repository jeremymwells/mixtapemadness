
(async function() {
  const helpers = require('./helpers');
  const argv = helpers.getArgs();

  process.env.SLS_DEBUG='*';
  // process.env.AWS_REGION=helpers.region;
  // process.env.AWS_ACCESS_KEY_ID=helpers.accessKeyId;
  // process.env.AWS_SECRET_ACCESS_KEY=helpers.secretAccessKey;

  const port = argv.port || '8080';

  // process.env.FE_STAGE = gitBranch;

  const runOfflineCode = await helpers.runProcess([
    `SLS_DEBUG=* npx sls offline start`,
    `--noTimeout`,
    `--httpPort ${port}`,
    `--stage ${helpers.envKey}`,
    `cloudside`
  ].join(' '));

  if (runOfflineCode) {
    process.exit(runOfflineCode);
  }
}());