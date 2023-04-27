
import { Address } from './address';
import { DynamoItem } from './dynamo-item';

// eslint-disable-next-line no-use-before-define
export class Organization extends DynamoItem {
  name: string;
  searchName: string;
  type: string;
  addresses: Address[];

  toItem () { // transforms any properties for saving
    this.searchName = this.name.toLowerCase();
    return this;
  }

  fromItem (item: any) { // transforms any dynamodb records for use in app
    if (!item) { return; }
    const org = new Organization();
    Object.keys(item).forEach(key => {
      org[key] = item[key];
    });
    return org;
  }

  get cognitoGroup(): {GroupName: string, Description: string} {
    const capitalizedType = (this.type || '').charAt(0).toUpperCase() + this.type.slice(1);

    return {
      GroupName: (this.searchName || '').toLowerCase().replace(/\s/, '-'),
      Description: `${ capitalizedType }: ${ this.name } Users`
    }
  }
}
