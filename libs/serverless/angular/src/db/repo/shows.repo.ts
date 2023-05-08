import { Show } from '../models';

import { RepoBase } from './repo-base';

export class ShowsRepo extends RepoBase<Show> {
  partitionKey = 'year';
  sortKey = 'dateAndTime';

  constructor () {
    super(Show);
  }

  async getAllByYear (year: number) {
    const shows = await this.selectAll([{ [this.partitionKey]: year }], ['*']);
    return Promise.resolve(shows?.map(show => {
      console.log('MUTATING SHOW', show);
      return new Show().fromItem(show);
    }));
  }

  async getOneById (id: number) {
    const shows = await this.selectAll([{ id }], ['*'], '_id');
    return Promise.resolve(new Show().fromItem((shows ||[])[0]));
  }

  async getOneBySearchName (searchName: string) {
    const shows = await this.selectAll([{ searchName }], ['*'], 'searchName');
    return Promise.resolve(new Show().fromItem((shows || [])[0]));
  }

  async getAllByTypeAndName (type: string, name: string): Promise<(Show | undefined)[]> {
    const shows = await this.selectAll(
      [{ [this.partitionKey]: type, searchName: name.toLowerCase() }],
      ['*'],
      'searchName'
    );
    return Promise.resolve((shows || []).map(show => new Show().fromItem(show)));
  }

  async putOne (show: Show): Promise<Show> {
    const type = show[this.partitionKey] || 'unknown';
    const id = show[this.sortKey] || Date.now();

    return this.putItem({
      ...show,
      [this.partitionKey]: type,
      [this.sortKey]: id
    } as any);
  }
}
