import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  UrlTree,
  Router,
  CanActivateFn,
  ActivatedRoute
} from '@angular/router';
import { SessionService } from './session.service';
import { Observable, Subject, Subscription, filter, from, iif, map, merge, mergeMap, of } from 'rxjs';
import { AppService } from './app.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

export const AuthGuard: CanActivateFn = (
  nnext: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  inject(SessionService).init();
  const appSvc = inject(AppService);
  const router = inject(Router);
  if (appSvc.session.state.authenticated) {
    return true;
  } 
  return new Observable<UrlTree | boolean>(({ next, complete }) => {
    const subscription = appSvc.session.state$.pipe(
      filter((sessionState) => sessionState.authenticated || sessionState.noUser)
    )
    .subscribe(async (sessionState: any) => {
      if (!sessionState.authenticated && sessionState.noUser) {
        router.navigateByUrl('/sign-in') as any;
        // next(false)
      } else {
        router.navigateByUrl(state.url)
        // next(true)
      }
      // subscription.unsubscribe();
      // complete();
    });
  });
}