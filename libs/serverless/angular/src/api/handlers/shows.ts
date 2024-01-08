import { parseBody, responseIfAnythingIsUnhandled } from '../decorators';
import { Response } from '../models';
import { ShowService } from '../../services';

class ShowsHandler {

  @responseIfAnythingIsUnhandled(Response.GetDefault(500))
  async get (event: any, _context: any, callback: any) {
    const response = await new ShowService(event).getShowsForYear();
    response.send(callback);
  }

  @parseBody()
  @responseIfAnythingIsUnhandled(Response.GetDefault(505))
  async write (event: any, _context: any, callback: any) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(event);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    let response = Response.GetDefault(200);
    if (event.body.action === 'update') {
      response = await new ShowService(event).updateShow();
    } else if (event.body.action === 'create') {
      response = await new ShowService(event).createShow();
    }
    response.send(callback);
  }

}

export const {
  get,
  write
} = new ShowsHandler();
