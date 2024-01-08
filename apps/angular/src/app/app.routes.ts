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
import { SignInComponent } from './components/routed/sign-in/sign-in.component';
// import { AuthGuard, PermissionsService } from './auth-guard';
import { EditShowsComponent } from './components/routed/admin/edit-shows/edit-shows.component';
import { AuthGuard } from './auth-guard';
import { AdminHomeComponent } from './components/routed/admin/home/admin-home.component';
import { AdminBannerComponent } from './components/routed/admin/banner/admin-banner.component';

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
  { path: 'admin',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'banner', component: AdminBannerComponent },
      { path: 'shows', component: EditShowsComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'sign-in', component: SignInComponent },
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
