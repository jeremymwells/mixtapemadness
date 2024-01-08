import { Injectable } from '@angular/core';
import * as aws from 'aws-amplify';
import { getCurrentUser, AuthUser, fetchUserAttributes } from 'aws-amplify/auth';

import { config } from './config';
import { Subject, Subscription } from 'rxjs';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ShowsService } from './shows.service';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

export class SessionState {
  isInitialized = false;
  user: any = undefined;
  shows = {
    future: [],
    past: [],
    display: [],
    all: []
  };
  authenticated = false;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _sub = new Subscription();
  state$ = new Subject<AuthUser | any>();
  state = new SessionState();
  get dataUserName() {
    return `${this.state.user.name} (${this.state.user.email})`
  }
  constructor(
    private amplifyService: AuthenticatorService,
    private showsService: ShowsService
  ) { }

  private async _tryInitUser() {
    try {
      this.state = {
        ...this.state,
        user: {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes())
        },
        authenticated: true
      };

      delete (this.state as any).noUser;

      this.state$.next({
        ...this.state
      });

    } catch (ex) {
      this.state$.next({
        ...this.state,
        noUser: true
      })
      console.log('couldnt get user')
    }
  }

  async init(reinit = false) {
    if (this.state.isInitialized || reinit) { return; }

    aws.Amplify.configure({
      Auth: config.aws,
    });

    this._tryInitUser();

    this._sub.add(this.amplifyService.subscribe(async (data: any) => {
      if (data.authStatus === "authenticated") {
        if (!this.state.user) { 
          this._tryInitUser();
        }
      }
    }));

    this.state.isInitialized = true;


  }

}