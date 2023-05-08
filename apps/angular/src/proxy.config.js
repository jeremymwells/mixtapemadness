const envKey = require('../../../libs/serverless/angular/scripts/helpers').envKey;

module.exports = {
  "/api": {
    "target": `http://localhost:8080/${envKey}`,
    "secure": false
  }
}