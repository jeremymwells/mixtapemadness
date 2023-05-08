import { PlacesService } from '../../services/places.service';

class PlacesHandler {

  async getPlace (event: any, _context: any, callback: any) {
    const response = await new PlacesService(event).getPlaceResponse();
    response.send(callback);
  }

}

export const {
  getPlace
} = new PlacesHandler();
