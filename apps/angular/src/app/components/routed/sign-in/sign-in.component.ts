import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, SessionService } from '../../../session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { AppService } from '../../../app.service';
import { Observable, Subscription, from } from 'rxjs';
// import { AuthGuard, PermissionsService } from '../../../auth-guard';
import { ShowsService } from '../../../shows.service';
import { AuthGuard } from '../../../auth-guard';
// import { Amplify } from 'aws-amplify';
// import { config } from '../../../config';

// Amplify.configure(config.aws as any);


@Component({
  selector: 'mixtapemadness-sign-in',
  imports: [
    CommonModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    // AuthGuard
  ],
  providers: [
    // PermissionsService,
    // AuthGuard,
    AppService,
    ShowsService,
    SessionService,
  ],
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit, OnDestroy {
  activeUser: any;
  sub = new Subscription();
  constructor(
    private appSvc: AppService,
    public router: Router,
    private amplifyService: AuthenticatorService
  ) { }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub.add(this.amplifyService.subscribe((data: any) => {
      if (data.authStatus === 'authenticated') {
        return from(this.router.navigate(['/admin']));
      };
      return from(Promise.resolve(false));
    }));

    this.sub.add(
      this.appSvc.user$.subscribe((user) => {
        this.activeUser = user.name;
      })
    )
  }

  // public signIn(): void {
  //   console.log('SIGN IN');
  //   this.loading = true;
  //   this.cognitoService.signIn(this.user)
  //   .then(() => {
  //     this.router.navigate(['/admin']);
  //   }).catch(() => {
  //     this.loading = false;
  //   });
  // }

}

// import { signIn, type SignInInput } from 'aws-amplify/auth';

// async function handleSignIn({ username, password }: SignInInput) {
//   try {
//     const { isSignedIn, nextStep } = await signIn({ username, password });
//   } catch (error) {
//     console.log('error signing in', error);
//   }
// }