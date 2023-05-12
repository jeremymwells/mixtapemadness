import { Route } from "@angular/router";
import { HomeComponent } from './components/routed/home/home.component';
import { AboutComponent } from './components/routed/about/about.component';
import { ShowsComponent } from './components/routed/shows/shows.component';
import { SocialsComponent } from './components/routed/socials/socials.component';
import { VideoComponent } from './components/routed/video/video.component';
import { SubscribeComponent } from './components/routed/subscribe/subscribe.component';
import { StoreComponent } from './components/routed/store/store.component';
import { ContactComponent } from './components/routed/contact/contact.component';
import { YTComponent } from './components/routed/socials/yt/yt.component';
import { SocialsHomeComponent } from './components/routed/socials/socials-home/socials-home.component';
import { FBComponent } from './components/routed/socials/fb/fb.component';
import { PersonComponent } from './components/routed/about/person/person.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent,
    children: [
      { path: ':personOrPersons', component: PersonComponent },
      { path: '**', redirectTo: 'us', pathMatch: 'full' }
    ]
  },
  { path: 'shows', component: ShowsComponent },
  { path: 'socials', component: SocialsComponent,
    children: [
      { path: 'home', component: SocialsHomeComponent },
      { path: 'yt', component: YTComponent },
      { path: 'fb', component: FBComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'video', component: VideoComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
