
(async function() {
  let helpers = require('./helpers');
  await helpers.exportServerless();
  delete require.cache[require.resolve('./helpers')];
  helpers = require('./helpers');

  const {
    stackName,
  } = helpers;

  process.env.MY_AWS_AKI = helpers.awsAccessKeyId;
  process.env.MY_AWS_SAK = helpers.awsSecretAccessKey;
  process.env.DDB_TABLE_PREFIX = stackName;
  process.env.MIGRATIONS_TABLE = `${stackName}.migrations`;
  console.log('Running migration delta');
  const migrationDirection = process.argv[2];
  const migrationDelta = (await helpers.runProcess(`npx mograte delta`, true, true)).data.trim();
  console.log('Migration delta: ', migrationDelta);
  const migrationsResultCode = await helpers.runProcess(`npx mograte ${migrationDirection}`, true);
  if (migrationDirection.toLowerCase() === 'up' && migrationsResultCode) {
    console.error('There was an error migrating. Reverting.')
    await helpers.runProcess(`npx mograte down ${migrationDelta}`, true);
  }

  if (migrationsResultCode) {
    process.exit(migrationsResultCode);
  }

}());