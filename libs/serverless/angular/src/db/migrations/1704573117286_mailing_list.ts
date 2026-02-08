/* eslint-disable */
import { MigrationContext } from 'mograte';
const pfx = process.env.DDB_TABLE_PREFIX;

const showsTable = {
  TableName: `${pfx}.people`,
  KeySchema: [
    { AttributeName: 'email', KeyType: 'HASH' },
    { AttributeName: 'createdDate',  KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'createdDate', AttributeType: 'N' },    
  ],
  BillingMode: 'PAY_PER_REQUEST',
  StreamSpecification: {
    StreamEnabled: false
  }
};


export default {
  up: async (context: MigrationContext): Promise<any> => {

  },
  down: async (_context: MigrationContext): Promise<any> => {
    return Promise.resolve()
  }
}
// ["1704562137837_shows_2024.ts","1683074616774_shows_2023.ts"]