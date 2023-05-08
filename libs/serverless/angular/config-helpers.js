const proxyProc = require('child_process');
const exec = require('shelljs').exec;
const urlSafeString = require('url-safe-string');
const camelify = require('camelify');
const stripColorCodes = require('strip-color');

if (require('fs').existsSync('.env')) {
  process.env = {
    ...process.env,
    ...require('dotenv').config().parsed
  }
}

const helperResults = {
  environmentBonafides: '',
  stackName: '',
  username: '',
  gitBranch: '',
  fqdn: '',
  environmentKey: ''
}

const safeCamelString = (str) => {
  return camelify(new urlSafeString().generate(str));
}

const getGitBranch = async (branchName) => {
  if (helperResults.gitBranch) { return helperResults.gitBranch; }

  if (branchName) {
    branchName = branchName.replace('refs/heads/', '').replace('refs/tags/', '');
    return Promise.resolve(safeCamelString(branchName));
  }

  helperResults.gitBranch = await new Promise((resolve, reject) => {
    proxyProc.exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      if (typeof stdout === 'string') {
        const result = safeCamelString(stdout.trim());
        resolve(result);
      }
    });
  });
  return helperResults.gitBranch;
}

const runProcess = async (command, suppressExit = false, captureOutput = false) => {
  return new Promise((resolve) => {
    
    const proc = exec(command, { async:true });
    let data='';
    if (captureOutput) {
      proc.stdout.on('data', (d) => {
        data += stripColorCodes(d);
      });
    }
    proc.on('exit', function (code) {
      if (!suppressExit) {
        console.log('child process exited with code ' + code.toString());
      }
      if (captureOutput) {
        return resolve({ data, code })
      }
      resolve(code);
    });
  });
}

const getEnvironmentBonafides = async (options, resolveVariable) => {
  // if (helperResults.environmentBonafides) { return Promise.resolve(helperResults.environmentBonafides); }

  const cliStage = (await resolveVariable('self:provider.stage')) || '';
  let result;
  switch (cliStage.toLowerCase()) {
    case 'stg':
    case 'tst':
    case 'uat':
    case 'prod':
      result = {
        isEphemeral: false, // is path-to-production
        isProd: cliStage.toLowerCase() === 'prod',
        key: cliStage.toLowerCase(),
      };
      break;
    case 'dev':
      result = {
        isEphemeral: true, // is branch
        isProd: false,
        key: 'dev'
      };
      break;
    default:
      result = {
        isEphemeral: true, // is branch
        isProd: false,
        key: 'nonprod'
      }
      break;
  }
  helperResults.environmentBonafides = result;
  return Promise.resolve(helperResults.environmentBonafides);
}

const getUsername = () => {
  if (helperResults.username) { return helperResults.username; }
  helperResults.username = safeCamelString(process.env.GITHUB_ACTOR || require('os').userInfo().username).toLowerCase();
  return helperResults.username;
}

const getStackName = async (options, resolveVariable) => {
  if (helperResults.stackName) { return helperResults.stackName; }

  const environment = await getEnvironmentBonafides(options, resolveVariable);
  let cliStage = await resolveVariable('self:provider.stage');
  const service = await resolveVariable('self:service');
  const username = getUsername();
  const branchName = await getGitBranch(process.env.GITHUB_REF);
  let stackSuffix = branchName.toLowerCase();
  const segments = [service];
  if (environment.isEphemeral) {
    segments.push(username);
    segments.push(stackSuffix);
  } else {
    segments.push(cliStage);
  }

  helperResults.stackName = segments.join('-').toLowerCase();
  return helperResults.stackName;
}

const getFQDN = async (options, resolveVariable) => {
  if (helperResults.fqdn) { return Promise.resolve(helperResults.fqdn); }

  const environment = await getEnvironmentBonafides(options, resolveVariable);
  const branchName = await getGitBranch(process.env.GITHUB_REF);
  const domainName = await resolveVariable('self:custom.domain-name');
  const prodCNAME = await resolveVariable('self:custom.prod-CNAME')

  // non-master branch
  if (environment.isEphemeral) {
    helperResults.fqdn = await Promise.resolve(`${getUsername()}-${branchName}.${domainName}`.toLowerCase());
    return Promise.resolve(helperResults.fqdn);
  }

  // long-lived non-prod branch
  if (!environment.isProd) {
    helperResults.fqdn = await Promise.resolve(`${environment.key}.${domainName}`.toLowerCase());
    return Promise.resolve(helperResults.fqdn);
  }
  
  // prod
  helperResults.fqdn = await Promise.resolve(`${prodCNAME}.${domainName}`.toLowerCase());
  return Promise.resolve(helperResults.fqdn);
}

const getEnvironmentKey = async (options, resolveVariable) => {
  if (helperResults.environmentKey) { return Promise.resolve(helperResults.environmentKey); }
  const environment = await getEnvironmentBonafides(options, resolveVariable);
  helperResults.environmentKey = environment.key;
  return Promise.resolve(helperResults.environmentKey);
}



module.exports = {
  getUsername,
  getEnvironmentKey,
  getFQDN,
  getGitBranch,
  getEnvironmentBonafides,
  runProcess,
  getStackName
}