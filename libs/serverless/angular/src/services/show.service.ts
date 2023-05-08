import { Response } from '../api/models';
import { ShowsRepo } from '../db/repo';

export class ShowService {

  constructor (
    private event: any,
    private showRepo = new ShowsRepo()
  ) { }

  async getShowsForYear (): Promise<Response> {
    const yearNumber = Number(this.event.queryStringParameters?.year);
    if (!this.event.queryStringParameters?.year || isNaN(yearNumber)) {
      return Response.GetDefault(406);
    }

    const shows = (await this.showRepo.getAllByYear(yearNumber)) || [];
    return new Response(200, shows);
  }

}
