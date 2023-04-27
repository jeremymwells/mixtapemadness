import * as AWS from 'aws-sdk';
import { responseIfPropAbsent } from '../../decorators/response-if-prop-absent.decorator';
import { Response } from '../../models';
import { AuthResponseCode } from '../../enums/api/auth-response-code';
import cognito from '../../../db/migrations/1656694150695_cognito';
import { CognitoService } from '../cognito.service';
import { RegistrationUser } from '../../models/api/registration-user.model';
import { ResponseStatus } from '../../enums';
import { SNSService } from '../sns.service';
import { UserService } from '../domain/user.service';

// see here for more examples:
// https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-javascriptv3-example_code-cognito.html

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE });

export class AuthService {

  constructor (
    private event: any,
    // private cognitoService = new CognitoService(),
    // private snsService = new SNSService(),
    private userService = new UserService()
  ) { }

  @responseIfPropAbsent(
    new Response(403, 'missing required field: email, password, firstName, lastName, organization'),
    (e) => e.body.email,
    (e) => e.body.password,
    (e) => e.body.firstName,
    (e) => e.body.lastName,
    (e) => e.body.organization,
  )
  async getRegisterResponse (): Promise<Response> {
    const registrationUser = new RegistrationUser(
      this.event.body.email,
      this.event.body.password,
      this.event.body.firstName,
      this.event.body.lastName,
      this.event.body.organization,
    );


    let tokenResponse;
    try {
      tokenResponse = await this.userService.registerAndLoginNewUser(registrationUser);
    } catch (obfuscatedAuthError: any | { error: AuthResponseCode }) {
      console.error('auth.service - getRegisterResponse - REGISTER AND LOGIN USER ERROR', obfuscatedAuthError);
      return new Response(ResponseStatus.x500, obfuscatedAuthError).asPromise();
    }

    return Promise.resolve(tokenResponse);

    // try {
    //   console.log('DELETING USER', registrationUser);
    //   await this.deleteUser(registrationUser);
    // } catch (snsError) {
    //   console.error('auth.service - getRegisterResponse - SNS PUBLISH DELETE USER ERROR', snsError)
    // }

    // console.log('auth.service - getRegisterResponse - CREATE USER SUCCESS', newUser);

    // let userPWResponse;
    // try {
    //   userPWResponse = await this.cognitoService.setUserPassword(registrationUser);
    // } catch (obfuscatedAuthError: any |  { error: AuthResponseCode }) {
    //   console.error('auth.service - getRegisterResponse - SET USER PASSWORD ERROR', obfuscatedAuthError);
    //   // try {
    //   //   console.log('DELETING USER', registrationUser);
    //   //   await this.deleteUser(registrationUser);
    //   // } catch (snsError) {
    //   //   console.error('auth.service - getRegisterResponse - SNS PUBLISH DELETE USER ERROR', snsError)
    //   // }
    //   return new Response(ResponseStatus.x500, obfuscatedAuthError).asPromise();
    // }

    // console.log('auth.service - getRegisterResponse - SET USER PASSWORD SUCCESS', userPWResponse);

    return this.getLoginResponse()
  }

  @responseIfPropAbsent(
    new Response(403, 'missing required field: email, password'),
    (e) => e.body.email || e.body.username,
    (e) => e.body.password,
  )
  async getLoginResponse (): Promise<Response> {
    const { email, username, password } = this.event.body;
    
    let tokenResponse;
    try {
      tokenResponse = await this.cognitoService.getUserToken({ email: email || username, password })
    } catch (obfuscatedLoginError: any | { error: AuthResponseCode }) {
      console.error('auth.service - getLoginResponse - LOGIN ERROR', obfuscatedLoginError);
      return new Response(ResponseStatus.x401, obfuscatedLoginError).asPromise();
    }
    
    return new Response(ResponseStatus.x200, tokenResponse).asPromise();
  }

  async doCreateGroup() {
    return cognito.up();
  }

  async doDeleteGroup() {
    return cognito.down();
  }

}
