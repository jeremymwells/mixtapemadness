/* eslint-disable */
import { MigrationContext } from 'mograte';
import { Show } from '../models';
import { ShowsRepo } from '../repo/shows.repo';
const pfx = process.env.DDB_TABLE_PREFIX;

const showsTable = {
  TableName: `${pfx}.shows`,
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' },
    { AttributeName: 'dateAndTime',  KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'dateAndTime', AttributeType: 'S' },

    { AttributeName: 'searchVenue', AttributeType: 'S' },
    { AttributeName: 'searchCity', AttributeType: 'S' },
    { AttributeName: 'searchState', AttributeType: 'S' },
    
  ],
  GlobalSecondaryIndexes: [{ 
      IndexName: '_searchVenue',
      KeySchema: [{
        AttributeName: 'searchVenue',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
    },{
      IndexName: '_searchCity',
      KeySchema: [{
        AttributeName: 'searchCity',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
    },{
      IndexName: '_searchState',
      KeySchema: [{
        AttributeName: 'searchState',
        KeyType: 'HASH'
      }],
      Projection: {
        ProjectionType: 'ALL'
      }
  }],
  BillingMode: 'PAY_PER_REQUEST',
  StreamSpecification: {
    StreamEnabled: false
  }
};
export default {
  up: async (context: MigrationContext): Promise<any> => {
    await context.table.createAsync(showsTable as any);
    const shows = require('./seed/shows.json').map(x => new Show().fromItem(x)?.toItem());
    await context.item.writeAsync(shows, showsTable.TableName);
  },
  down: async (context: MigrationContext): Promise<any> => {
    await context.table.deleteAsync(showsTable.TableName);
  }
}
