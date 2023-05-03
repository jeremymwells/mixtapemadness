
(async function(){
  const helpers = require('./helpers');
  const argv = helpers.getArgs()
  if (require('fs').existsSync('.env')){
    require('dotenv').config();
  }
  const stackName = await helpers.getStackName(undefined, helpers.getResolveVariablesShim(argv));
  const envKey = await helpers.getEnvironmentKey(undefined, helpers.getResolveVariablesShim(argv));

  process.env.AWS_PROFILE = `${require('./package.json').name}-${envKey}`;
  process.env.DDB_TABLE_PREFIX = stackName;
  process.env.MIGRATIONS_TABLE = `${stackName}.migrations`;

  const migrationsResultCode = await helpers.runProcess(`mograte ${argv.cmd}`, true);

  if (migrationsResultCode) {
    process.exit(migrationsResultCode);
  }

}());