import { Route } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ShowsComponent } from './components/shows/shows.component';
import { SocialsComponent } from './components/socials/socials.component';
import { VideoComponent } from './components/video/video.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { StoreComponent } from './components/store/store.component';
import { ContactComponent } from './components/contact/contact.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'socials', component: SocialsComponent },
  { path: 'video', component: VideoComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
