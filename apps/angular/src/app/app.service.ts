/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Subject, Subscription, forkJoin } from 'rxjs';
import { SessionService, SessionState } from './session.service';
import { HttpClient } from '@angular/common/http';
import { ShowsService } from './shows.service';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Injectable({ providedIn: 'root' })
export class AppService {
  private _backButton = ['/home'];
  private _sub!: Subscription;

  showsSplit$ = new Subject<any>();
  user$ = new Subject<any>();
  applicationInitialized = false;
  lastInit = false;
  get backButton() {
    return this._backButton;
  }

  user: any;

  showsSplit = {
    futureShows: [],
    pastShows: [],
    displayShows: [],
    shows: []
  };

  menuItems: any = [
    [
      { 
        text: 'home',
        url: '/home',
      },
      { 
        text: 'shows',
        url: '/shows',
      },
    ],[
      { 
        text: 'about',
        url: '/about/us',
      }
    ]
  ];

  homePageItems: any|any[] = [
    [
      { 
        useRouterLink: true,
        text: 'upcoming shows',
        url: '/shows',
        img: 'assets/images/mixtapemadness_logo_green.png'
      },
    ],
    [
      { 
        text: 'book mixtape',
        url: 'tel:+17249716133',
        icon: 'ai-phone'
      },
      { 
        useRouterLink: true,
        text: 'about mixtape',
        url: '/about',
        icon: 'ai-info'
      },
    ],[
      { 
        text: 'Facebook',
        url: 'https://www.facebook.com/MTMADNESS/',
        icon: 'ai-facebook-fill'
      },
      { 
        text: 'YouTube',
        url: 'https://www.youtube.com/@mixtapeMadnessBand',
        icon: 'ai-youtube-fill'
      },
      { 
        text: 'Instagram',
        url: 'https://www.instagram.com/mixtapemadnessband/',
        icon: 'ai-instagram-fill'
      }
    ], [

    ]
  ];

  constructor(
    private _mediaObserver: MediaObserver,
    public session: SessionService,
    public showsService: ShowsService,
  ) {
    this.init()
  }

  init(reinit = false) {
    if (this.applicationInitialized || reinit) { return; }

    if (this._sub && this._sub.unsubscribe) { this._sub.unsubscribe(); }

    this._sub = new Subscription();

    // this.session.state$.subscribe((sessionState: SessionState) => {
    //   if (this.applicationInitialized) { return; }
    //   this.applicationInitialized = sessionState.isInitialized;
    //   this.session.state$.next({
    //     ...this.session.state,
    //     applicationInitialized: sessionState.isInitialized
    //   })
    // })

    this._sub.add(this.showsService.showsSplit$.subscribe((showsSplit) => {
      this.showsSplit = showsSplit;
      this.showsSplit$.next(this.showsSplit)
    }));
  }

  reinitShows() {
    this.showsService.reinitShows();
  }

  setBackButton(path: string[]) {
    this._backButton = path;
  }

  currentPathIs(path: string) {
    return document.location.pathname === path;
  }
  
  screenSizeMatches(queries: string[]): boolean {

    for (let i = 0; i < queries.length; i++) {
      const matches = this._mediaObserver.isActive(queries[i]);
      if (matches) {
        return true;
      }
    }
    return false;
  }
}

