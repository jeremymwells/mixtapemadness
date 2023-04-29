import { request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { URL } from 'url';
import * as querystring from 'querystring';

const requestTypes = {
  'https:': httpsRequest,
  'http:': httpRequest
};

const request = (url: string, requestOptions: { method: any; }, body?: string | undefined) => {
  const urlParts = new URL(url);
  const request = (requestTypes as any)[urlParts.protocol];
  if (!request) {
    throw new Error(`Protocol ${urlParts.protocol} not supported`);
  }

  return new Promise((resolve, reject) => {
    console.info('HTTP REQUEST BEFORE TRANSFORM: ', url, { ...urlParts, ...requestOptions, ...{ body } });
    const req = request(
      { ...urlParts, ...requestOptions },
      stringResponseParser((resp: unknown, err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      })
    );

    req.on('abort', (error: any) => {
      console.error('REQUEST ABORT ERROR', error);
      reject(error);
    });

    req.on('error', (error: any) => {
      console.error('REQUEST ERROR', error);
      reject(error);
    });

    switch (requestOptions.method) {
      case 'PATCH':
      case 'POST':
      case 'PUT': {
        const strBody = typeof body === 'object' ? JSON.stringify(body) : body;
        req.write(strBody);
        break;
      }
    }

    req.end();
  });
};

const stringResponseParser = (callback: { (resp: unknown, err: any): void; (arg0: string | undefined, arg1: string): void; }) => (response: any) => {
  let resp = '';
  let err = '';
  response.on('data', (chunk: string) => {
    resp += chunk;
  });

  response.on('error', (error: string) => {
    err += error;
  });

  response.on('end', () => {
    if (err || response.statusCode < 200 || response.statusCode > 299) {
      console.error(`HTTP RESPONSE ERROR [${response.statusCode}]`, err);
      callback(undefined, { statusCode: response.statusCode, response: resp });
    } else {
      console.info(`HTTP RESPONSE [${response.statusCode}]`, resp);
      callback(resp, err);
    }
  });
};

export class HttpClient {

  constructor (private defaultHttpClientOptions = {}) { }

  get<T> (url: any, options = {}) {
    return request(url, { ...this.defaultHttpClientOptions, ...options, method: 'GET' }) as Promise<T>;
  }

  post (url: any, body: any, options = {}) {
    return request(url, { ...this.defaultHttpClientOptions, ...options, method: 'POST' }, body);
  }

  put (url: any, body: any, options = {}) {
    return request(url, { ...this.defaultHttpClientOptions, ...options, method: 'PUT' }, body);
  }

  request (method: string, url: string, options = {}, body = '') {
    return request(
      url,
      { ...this.defaultHttpClientOptions, ...options, method: method.toUpperCase() },
      body
    );
  }

  stringifyQuery (query: any) {
    if (!Object.keys(query || {}).length) {
      return '';
    }
    return `?${querystring.stringify(query)}`;

  }

}
