type HttpResponse = { statusCode: number, body: string, headers?: any };

export function responseIfPropAbsent (
  response: HttpResponse,
  ...predicates: ((e:any) => any)[]
): any {

  return function wrapper (
    _methodClass: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): any {

    const originalMethod: any = descriptor.value;

    const value = async function (event, context, callback) {
      for (let i = 0; i < predicates.length; i++) {
        const prop = predicates[i](event || this.event);
        if (prop === undefined) {
          console.error('REQUIRED PROPERTY UNDEFINED BUT WHATEVZ', predicates[i].toString(), event);
          callback(null, response);
          return;
        }
      }

      return await originalMethod.apply(this, [event, context, callback]);
    };

    return Object.assign(descriptor, { value });
  };
}
