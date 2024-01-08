export const config = {
  aws: {
    Cognito: {
      userPoolId: 'us-east-1_s9l35TetV',
      userPoolClientId: '7jt6jbqdhlnjnlnfiaktbm3dd5',
      loginWith: {
        oauth: {
          domain: 'mixtapemadness.auth.us-east-1.amazoncognito.com',
          scopes: ['openid email phone profile aws.cognito.signin.user.admin '],
          redirectSignIn: ['/admin'],
          redirectSignOut: ['/'],
          responseType: 'code',
        },
        username: 'true',
        email: 'true',
        name: 'true',
      }
    }
  } as any
}