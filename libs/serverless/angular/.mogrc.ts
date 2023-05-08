import * as os from 'os';

export default {
  language: 'ts',
  migrationsDir: './src/db/migrations',
  migrationsTable: process.env.DDB_TABLE_PREFIX + '.migrations',
  awsConfig: {
    // profile: process.env.AWS_PROFILE || 'mixtapemadness-nonprod',
    accessKeyId: process.env.MY_AWS_AKI, // may also be read from process.env.AWS_ACCESS_KEY_ID
    secretAccessKey: process.env.MY_AWS_SAK, // may also be read from process.env.AWS_SECRET_ACCESS_KEY;
    region: 'us-east-1'
  },
  user: () => process.env.GITHUB_ACTOR || os.userInfo().username || 'unknown',
  keepJS: true,
}