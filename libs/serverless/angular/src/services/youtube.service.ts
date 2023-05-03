import { Response } from '../api/models';
import axios from 'axios';

export class YoutubeService {

  constructor(private _event: any, private _http = axios) {

  }

  private async getUploadsId() {
    const url = `https://www.googleapis.com/youtube/v3/channels?id=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}&part=contentDetails`;
    let response;
    try {
      console.info(`GETTING UPLOAD IDS FROM ${url}`);
      console.info(`YOUTUBE_CHANNEL_ID: ${process.env.YOUTUBE_CHANNEL_ID}`);
      console.info(`YOUTUBE_API_KEY: ${process.env.YOUTUBE_API_KEY}`);
      response = await this._http.get(url) as any;
    } catch (ex) {
      console.error('ERROR GETTING UPLOAD IDS', ex);
    }

    // log whole response
    console.info('RECEIVED RESPONSE: ', response);

    // get return value
    const responseData = response.data.items[0].contentDetails.relatedPlaylists.uploads;

    // log return value
    console.info('SENDING RESPONSE DATA: ', responseData);

    return responseData;
  }

  private async getAllUploadsPlaylistVideos(uploadsId, token='', items = []) {
    const url = [
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsId}`,
      `key=${process.env.YOUTUBE_API_KEY}`,
      'part=snippet',
      'maxResults=5',
      token ? `pageToken=${token}` : ''
    ]
    
    .filter(x=>x).join('&');
    
    let response;
    try {
      
      [
        `GETTING PLAYLIST ITEMS FROM ${url}`,
        `uploadsId: ${uploadsId}`,
        `YOUTUBE_API_KEY: ${process.env.YOUTUBE_API_KEY}`
      ]
      
      .forEach(console.info);

      response = await this._http.get(url) as any;
    } catch (ex) {
      console.error('ERROR GETTING ALL VIDEOS', ex);
    }

    // log and concatenate items
    console.info('RECEIVED RESPONSE: ', response);
    console.info('RECEIVED RESPONSE DATA: ', response.data.items);
    items = items.concat(response.data.items);

    // if we need to page, log and recurse
    if (items.length < response.data.pageInfo.totalResults) {
      console.info('ITERATING');
      return await this.getAllUploadsPlaylistVideos(uploadsId, response.nextPageToken, items);
    }

    console.info('SENDING DATA: ', items);
    return Promise.resolve(items);

  }

  async getVideosResponse (): Promise<Response> {
    console.info('GETTING ALL VIDEOS in getVideosResponse')
    const playlistId = await this.getUploadsId();
    
    console.info(`GOT UPLOADS ID ${playlistId}`)
    let videos;
    try {
      videos = await this.getAllUploadsPlaylistVideos(playlistId);
    } catch (ex) {
      console.error('ERROR GETTING ALL UPLOADS PLAYLIST VIDEOS', ex);
    }

    console.info('SENDING UPLOADS PLAYLIST VIDEOS', videos);
    return new Response(200, { playlistId, videos });
  }

}
