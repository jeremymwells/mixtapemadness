const path = require('path');
const fs = require('fs');
const _get = require('lodash.get');

class ServerlessFullstackPlugin {
    constructor(serverless, cliOptions) {

      this.error = serverless.classes.Error;
      this.serverless = serverless;
      this.options = serverless.service.custom['export-sls'];
      this.cliOptions = cliOptions || {};

      this.hooks = {
        'export:run': () => this.run(),
        'before:deploy:deploy': () => this.run(),
        'initialize': () => this.init()
      };

      this.commands = {
        export: {
          usage: 'Exports interpolated serverless configuration to an object you specify',
          lifecycleEvents: ['run'],
          options: {
            to: {
              usage: 'Specify the file name you want to export to (e.g. "--to ./.sls.config.json", or "-t ./.sls.config.json")',
              shortcut: 't',
              required: false,
              type: 'string',
            },
          },
        }
      };
    }

    init() {
      this.setClientEnv();
      this.prefix = this.getExportConfig('prefix', 'serverless.service');
      this.outFile = this.getOutFile();
      this.configuration = this.parseConfiguration();
    }

    run() {
      fs.writeFileSync(this.outFile, JSON.stringify(this.configuration.out, null, 4));
    }

    getOutFile() {
      const toFile = this.cliOptions.to || this.getExportConfig('toFile') || this.getExportConfig('to') || this.getExportConfig('t');
      if (!toFile) {
        throw new Error('Either `--to` or `custom.export.toFile` must be set; should be the filepath where you want to export configuration to');
      }
      return path.resolve(process.cwd(), toFile);
    }

    parseObject(o, newObject) {
      Object.keys(o).forEach((key) => {
        if (typeof o[key] === 'object') {
          newObject[key] = {};
          return this.parseObject(o[key], newObject[key]);
        }

        newObject[key] = this.getPrefixedValue(o[key]);
      })
      return newObject;
    }

    parseConfiguration() {
      const inputConfig = this.getExportConfig('config', {});
      const outputConfig = {}
      this.parseObject(inputConfig, outputConfig);

      return {
        in: inputConfig,
        out: outputConfig
      };
    }

    getPrefixedValue(key) {
      return _get(this, [this.prefix, key].join('.'));
    }

    setClientEnv() {
      this.serverless.cli.log(`Setting the environment variables...`);
      const serverlessEnv = this.serverless.service.provider.environment;

      if (!serverlessEnv) {
        return this.serverless.cli.log(
          `No environment variables detected. Skipping step...`
        );
      }

      Object.keys(serverlessEnv).forEach((key) => {
        if (!serverlessEnv[key]) {
          serverlessEnv[key] = process.env[key];
        }
      });
    
      return serverlessEnv;
    }

    getExportConfig(field, defaultValue) {
      return _get(this.serverless, `service.custom.export.${field}`, defaultValue)
    }

    getStage() {
      // find the correct stage name
      var stage = this.serverless.service.provider.stage;
      if (this.cliOptions && this.cliOptions.stage) {
        stage = this.cliOptions.stage;
      }
      return stage;
    }
}

module.exports = ServerlessFullstackPlugin;