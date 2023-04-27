
(async function() {
  const helpers = require('./helpers');
  
  const argv = helpers.getArgs();

  const deployOrRemove = argv.r || argv.remove ? 'remove': 'deploy';

  const gitBranch = await helpers.getGitBranch(process.env.GITHUB_REF);

  const stage = argv.stage || gitBranch;

  const deployResultCode = await helpers.runProcess(`SLS_DEBUG=* sls ${deployOrRemove} --stage ${stage}`);

  if (deployResultCode) {
    process.exit(deployResultCode);
  }

}());