
(async function() {
  const helpers = require('./helpers');
  const argv = helpers.getArgs();
  if (require('fs').existsSync('.env')){
      require('dotenv').config();
  }
  const writeOutput = (output) => {
      console.log('\x1b[33m%s\x1b[0m', `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      console.log('\x1b[33m%s\x1b[0m', `-`);
      console.log('\x1b[33m%s\x1b[0m', `-`);
      console.log('\x1b[33m%s\x1b[0m', `- Your app will be deployed to https://${output}`);
      console.log('\x1b[33m%s\x1b[0m', `-`);
      console.log('\x1b[33m%s\x1b[0m', `-`);
      console.log('\x1b[33m%s\x1b[0m', `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      console.log('');
      console.log('');
      console.log('');
      console.log('');
  }

  console.log('');
  console.log('');
  console.log('');
  console.log('');
  
  process.env.GITHUB_ACTOR = process.env.GITHUB_ACTOR || helpers.getUsername();
  const branchName = await helpers.getGitBranch(process.env.GITHUB_REF);
  const stage = ~branchName.indexOf('master') ? 'dev' : 'nonprod';

  const fqdn = await helpers.getFQDN(undefined, helpers.getResolveVariablesShim({ ...argv, stage }));

  writeOutput(fqdn);
}());
