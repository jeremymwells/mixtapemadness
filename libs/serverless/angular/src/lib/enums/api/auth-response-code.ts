// these enums abstract actionable errors so as to 
// prevent bots sniffing how to create users automatically
// the reason for doing this vs http status codes is -
// there are only so many http status codes.
// This lets all error responses be handled uniquely in the client

export enum AuthResponseCode {
  UnknownError = 1,

  UsernameExistsException = 100,
  UsernamePasswordException = 100.1,
  InvalidParameterException = 101,
  LoginError = 102,
  CognitoGetGroupError = 103,
  CognitoCreateGroupError = 104,
  DeleteUserError = 105,
}
