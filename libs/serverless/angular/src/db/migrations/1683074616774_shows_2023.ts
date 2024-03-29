/* eslint-disable */
import { MigrationContext } from 'mograte';
import { Show } from '../models';
import { ShowsRepo } from '../repo/shows.repo';
const pfx = process.env.DDB_TABLE_PREFIX;

const showsTable = {
  TableName: `${pfx}.shows`,
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' },
    { AttributeName: 'createdDate',  KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'createdDate', AttributeType: 'N' },

    // { AttributeName: 'searchVenue', AttributeType: 'S' },
    // { AttributeName: 'searchCity', AttributeType: 'S' },
    // { AttributeName: 'searchState', AttributeType: 'S' },
    
  ],
  // GlobalSecondaryIndexes: [{ 
    //   IndexName: '_searchVenue',
    //   KeySchema: [{
    //     AttributeName: 'searchVenue',
    //     KeyType: 'HASH'
    //   }],
    //   Projection: {
    //     ProjectionType: 'ALL'
    //   }
    // },{
    //   IndexName: '_searchCity',
    //   KeySchema: [{
    //     AttributeName: 'searchCity',
    //     KeyType: 'HASH'
    //   }],
    //   Projection: {
    //     ProjectionType: 'ALL'
    //   }
    // },{
    //   IndexName: '_searchState',
    //   KeySchema: [{
    //     AttributeName: 'searchState',
    //     KeyType: 'HASH'
    //   }],
    //   Projection: {
    //     ProjectionType: 'ALL'
    //   }
  // }],
  BillingMode: 'PAY_PER_REQUEST',
  StreamSpecification: {
    StreamEnabled: false
  }
};
export default {
  up: async (context: MigrationContext): Promise<any> => {
    await context.table.createAsync(showsTable as any);
    const shows2023 = require('./seed/shows_2023.json').map((x, i) => {
      return new Show().fromObject({ 
        ...x,
        createdDate: Date.now() + i
      });
    });
    console.log(shows2023);
    const result = await context.item.writeAsync(shows2023, showsTable.TableName);
    console.log(result);
  },
  down: async (context: MigrationContext): Promise<any> => {
    console.log(showsTable.TableName)
    await context.table.deleteAsync(showsTable.TableName);
  }
}
