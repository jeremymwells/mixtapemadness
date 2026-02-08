import { responseIfAnythingIsUnhandled } from '../../lib/decorators/response-if-anything-is-unhandled.decorator';
import { Response } from '../models';
import { AppService } from '../../services';

class PrintfulHandler {

  @responseIfAnythingIsUnhandled(Response.GetDefault(500))
  async getStore (event: any, _context: any, callback: any) {
    const response = new AppService(event).getResponse();
    response.send(callback);
  }

}

export const {
  getStore
} = new PrintfulHandler();
