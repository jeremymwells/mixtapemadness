
(async function() {
  let helpers = require('./helpers');
  await helpers.exportServerless();
  delete require.cache[require.resolve('./helpers')];
  helpers = require('./helpers');
  
  const argv = helpers.getArgs();

  const deployOrRemove = argv.r || argv.remove ? 'remove': 'deploy';

  process.env.AWS_ACCESS_KEY_ID = helpers.awsAccessKeyId;
  process.env.AWS_SECRET_ACCESS_KEY = helpers.awsSecretAccessKey;

  const deployResultCode = await helpers.runProcess(`SLS_DEBUG=* sls ${deployOrRemove} --stage ${argv.stage}`);

  if (deployResultCode) {
    process.exit(deployResultCode);
  }

}());