/* eslint-disable */
import { MigrationContext } from 'mograte';
import { Show } from '../models';
import { ShowsRepo } from '../repo/shows.repo';
const pfx = process.env.DDB_TABLE_PREFIX;

export default {
  up: async (context: MigrationContext): Promise<any> => {
    const shows2024 = require('./seed/shows_2024.json').map((x, i) => {
      return new Show().fromObject({ 
        ...x,
        createdDate: Date.now() + i
      });
    });
    console.log(shows2024);
    const result = await context.item.writeAsync(shows2024, `${pfx}.shows`);
    console.log(result);
  },
  down: async (_context: MigrationContext): Promise<any> => {
      return Promise.resolve()
  }
}
// ["1704562137837_shows_2024.ts","1683074616774_shows_2023.ts"]