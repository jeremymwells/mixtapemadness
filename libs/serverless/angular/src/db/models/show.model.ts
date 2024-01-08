
import { Location } from './location';
import { DynamoItem } from './dynamo-item';

// eslint-disable-next-line no-use-before-define
export class Show extends DynamoItem {
  year = new Date().getFullYear();
  dateAndTime = '';
  duration = 4;
  phone = '';
  address = '';
  city = '';
  state = '';
  venue = '';

  searchVenue = '';
  searchCity = '';
  searchState = '';


  toItem () { // transforms any properties for saving
    this.searchVenue = this.venue.toLowerCase();
    this.searchCity = this.city.toLowerCase();
    this.searchState = this.state.toLowerCase();
    this.year = new Date(this.dateAndTime).getFullYear();
    this.createdDate = this.createdDate || this.lastEditedDate || new Date().getTime();
    const jeremy = 'Jeremy Wells';
    if (!this.createdBy) {
      this.createdBy = jeremy
    }
    if (!this.lastEditedBy) {
      this.lastEditedBy = jeremy;
    }
    return this;
  }

  fromItem (item: any): Show | undefined { // transforms any dynamodb records for use in app
    // console.log('ITEM!!!', typeof item);
    if (!item) { return; }
    const show = new Show();
    Object.assign(show, item);
    return show;
  }

  fromObject(item: any) {
    return new Show().fromItem(item)?.toItem();
  }
}
