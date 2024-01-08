import { Response } from '../api/models';
import { Show } from '../db/models';
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

  async updateShow (): Promise<Response> {
    delete this.event.body.action;
    delete this.event.body.cron;
    delete this.event.body.time;
    delete this.event.body.date;
    const result = await this.showRepo.updateItem(new Show().fromObject(this.event.body)?.toItem() as any);
    console.log(result);
    return Response.GetDefault(200);
  }

  async createShow (): Promise<Response> {
    delete this.event.body.action;
    delete this.event.body.cron;
    delete this.event.body.time;
    delete this.event.body.date;
    const result = await this.showRepo.putOne(new Show().fromObject(this.event.body) as any);
    // const result = await this.showRepo.putItem(new Show().fromObject(this.event.body)?.toItem() as any);
    console.log(result);
    return Response.GetDefault(200);
  }

}
