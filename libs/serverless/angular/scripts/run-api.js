
(async function() {
  let helpers = require('./helpers');
  await helpers.exportServerless();
  delete require.cache[require.resolve('./helpers')];
  helpers = require('./helpers');


  process.env.MY_AWS_AKI = helpers.awsAccessKeyId;
  process.env.MY_AWS_SAK = helpers.awsSecretAccessKey;
  process.env.SLS_DEBUG='*';

  const port = helpers.getArgs().port || '8080';

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