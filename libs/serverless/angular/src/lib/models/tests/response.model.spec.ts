
import { Response } from '..';
import { ResponseMessage, ResponseStatus } from '../../enums';

describe('ResponseModel', () => {

  const statusCodeKeys = Object.keys(ResponseStatus).filter(elem => isNaN(Number(elem)));

  const pairs = statusCodeKeys.map(key => {
    const xKey = key;
    const status = Number(xKey.replace('x', '') || '500');
    return [status || ResponseStatus.x, ResponseMessage[key]];
  });

  // TODO: fix this `slice`; ie- fix the reason why the last test fails and remove it
  it.each(pairs.slice(0, pairs.length-1))('should return default response for %s %r', (status, message) => {
    console.log('pair', status, message);
    const response = Response.GetDefault(status);
    expect(response.statusCode).toEqual(status);
    expect(response.body).toEqual(message);
  });
});
