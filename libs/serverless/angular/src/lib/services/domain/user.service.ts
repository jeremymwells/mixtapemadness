import { ResponseStatus } from "../../enums";
import { AuthResponseCode } from "../../enums/api/auth-response-code";
import { Response } from "../../models";
import { RegistrationUser } from "../../models/api/registration-user.model";
import { CognitoService } from "../cognito.service";
import { SNSService } from "../sns.service";

export class UserService {
  constructor(
    private cognitoService = new CognitoService(),
    private snsService = new SNSService()
  ) { }

  private deleteUser(user): Promise<any> {
    return this.snsService.publish(process.env.SNS_DELETE_USER, user);
  }

  async registerAndLoginNewUser(eventRegistrationUser: RegistrationUser) {
    const registrationUser = new RegistrationUser(
      eventRegistrationUser.email,
      eventRegistrationUser.password,
      eventRegistrationUser.firstName,
      eventRegistrationUser.lastName,
      eventRegistrationUser.organization,
    );


    let newUser;
    try {
      newUser = await this.cognitoService.createUser(registrationUser)
    } catch (obfuscatedError: any | { error: AuthResponseCode }) {
      console.error('user.service - registerNewUser - REGISTER USER ERROR', obfuscatedError);
      return new Response(ResponseStatus.x500, obfuscatedError).asPromise();
    }

    try {
      console.log('DELETING USER', registrationUser);
      await this.deleteUser(registrationUser);
    } catch (snsError) {
      console.error('user.service - registerAndLoginNewUser - SNS PUBLISH DELETE USER ERROR', snsError)
    }

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



  getTokens(email, password) {}

}