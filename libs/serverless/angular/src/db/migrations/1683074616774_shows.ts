/* eslint-disable */
import { MigrationContext } from 'mograte';
const pfx = process.env.DDB_TABLE_PREFIX;

const showsTable = {
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' },
    { AttributeName: 'dateAndTimes',  KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'dateAndTimes', AttributeType: 'N' },
    { AttributeName: 'title', AttributeType: 'S' },
    { AttributeName: 'city', AttributeType: 'S' },
    { AttributeName: 'state', AttributeType: 'S' },
    { AttributeName: 'venue', AttributeType: 'S' },

    { AttributeName: 'searchTitle', AttributeType: 'S' },
    { AttributeName: 'searchVenue', AttributeType: 'S' },
    { AttributeName: 'searchCity', AttributeType: 'S' },
    { AttributeName: 'searchState', AttributeType: 'S' },
    
  ],
  GlobalSecondaryIndexes: [{
      IndexName: 'searchTitle',
      KeySchema: [{
        AttributeName: 'title',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
    },{ 
      IndexName: 'searchVenue',
      KeySchema: [{
        AttributeName: 'searchVenue',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
    },{
      IndexName: 'searchCity',
      KeySchema: [{
        AttributeName: 'city',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
    },{
      IndexName: 'searchState',
      KeySchema: [{
        AttributeName: 'state',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
  }],
  BillingMode: 'PAY_PER_REQUEST',
  TableName: `${pfx}.shows`,
  StreamSpecification: {
    StreamEnabled: false
  }
};
export default {
  up: async (context: MigrationContext): Promise<any> => {
    const shows = require('./seed/shows.json');
    await context.item.writeAsync(shows, showsTable.TableName);
  },
  down: async (context: MigrationContext): Promise<any> => {
    await context.table.deleteAsync(showsTable.TableName);
  }
}
