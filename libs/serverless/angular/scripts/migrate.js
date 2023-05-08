
(async function() {
  let helpers = require('./helpers');
  await helpers.exportServerless();
  delete require.cache[require.resolve('./helpers')];
  helpers = require('./helpers');

  const argv = helpers.getArgs();

  const {
    stackName,
  } = helpers;

  process.env.MY_AWS_AKI = helpers.awsAccessKeyId;
  process.env.MY_AWS_SAK = helpers.awsSecretAccessKey;
  process.env.DDB_TABLE_PREFIX = stackName;
  process.env.MIGRATIONS_TABLE = `${stackName}.migrations`;

  const migrationsResultCode = await helpers.runProcess(`npx mograte ${argv.cmd}`, true);

  if (migrationsResultCode) {
    process.exit(migrationsResultCode);
  }

}());