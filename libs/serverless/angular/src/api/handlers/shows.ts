import { responseIfAnythingIsUnhandled } from '../decorators';
import { Response } from '../models';
import { ShowService } from '../../services';

class ShowsHandler {

  @responseIfAnythingIsUnhandled(Response.GetDefault(500))
  async get (event: any, _context: any, callback: any) {
    const response = await new ShowService(event).getShowsForYear();
    response.send(callback);
  }

}

export const {
  get
} = new ShowsHandler();
