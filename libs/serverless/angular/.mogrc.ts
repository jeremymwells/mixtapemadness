import * as os from 'os';

export default {
  language: 'ts',
  migrationsDir: './src/db/migrations',
  migrationsTable: 'migrations',
  awsConfig: {
    profile: process.env.AWS_PROFILE || 'mixtapemadness-nonprod'
  },
  user: () => process.env.GITHUB_ACTOR || os.userInfo().username || 'unknown',
  keepJS: true,
}