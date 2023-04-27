export class RegistrationUser {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public organization: string,
  ) { }
}