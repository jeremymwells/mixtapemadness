/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AppService implements OnDestroy {
  private _mediaObs$ = new Subscription();
  private _backButton = ['/home'];

  get backButton() {
    return this._backButton;
  }

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

  constructor(private _mediaObserver: MediaObserver) {
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

  ngOnDestroy(): void {
    this._mediaObs$.unsubscribe();
  }
}

