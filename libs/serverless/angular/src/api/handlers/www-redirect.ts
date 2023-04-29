
class WWWHandler {

  async redirect (event: any, _context: any, callback: any) {
    const cfrequest = event.Records[0].cf.request;
    if (cfrequest.uri.length > 0 && cfrequest.uri.charAt(cfrequest.uri.length - 1) === '/') {
      // e.g. /posts/ to /posts/index.html
      // cfrequest.uri += DEFAULT_OBJECT;
    }
    callback(null, cfrequest);
    return true;
  }

}

export const {
  redirect
} = new WWWHandler();
