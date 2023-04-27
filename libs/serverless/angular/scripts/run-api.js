
(async function() {
  const helpers = require('./helpers');

  const argv = helpers.getArgs();
  
  if (require('fs').existsSync(argv.dotenv || '.env')) {
    require('dotenv').config();
  }

  process.env.BROWSER = 'none';
  process.env.FAST_REFRESH = 'false';
  process.env.SLS_DEBUG='*';
  const port = argv.port || '8080';
  const gitBranch = await helpers.getGitBranch(process.env.GITHUB_REF);
  process.env.FE_STAGE = gitBranch;
  const stackName = await helpers.getStackName(null, helpers.getResolveVariablesShim(argv));
  const appStage = (argv || { }).stage || 'nonprod';

  const runOfflineCode = await helpers.runProcess([
    `npx sls offline start`,
    // `--printOutput`,
    `--httpPort ${port}`,
    `--stage ${gitBranch}`,
    `cloudside`,
    // `--stackName ${stackName}`,
    // `--cloudStage=${appStage}`,
  ].join(' '));

  if (runOfflineCode) {
    process.exit(runOfflineCode);
  }
}());