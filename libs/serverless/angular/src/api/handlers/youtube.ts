import { YoutubeService } from '../../services/youtube.service';

class YoutubeHandler {

  async getVideos (event: any, _context: any, callback: any) {
    const response = await new YoutubeService(event).getVideosResponse();
    response.send(callback);
  }

}

export const {
  getVideos
} = new YoutubeHandler();
