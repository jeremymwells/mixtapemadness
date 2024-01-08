import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { akarIcon, akarThreeLineHorizontal, akarLinkOut } from '@ng-icons/akar-icons';
import { HeaderComponent } from './components/general-use/header/header.component';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './components/general-use/link/link.component';
import { AppService } from './app.service';
import { SessionService } from './session.service';
import { Subscription, forkJoin } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ShowsService } from './shows.service';
// import { AuthGuard, PermissionsService } from './auth-guard';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    LinkComponent,
    NgIconComponent,
    HttpClientModule
  ],
  providers: [
    provideIcons({ akarIcon, akarThreeLineHorizontal, akarLinkOut }),
    AppService,
    ShowsService,
    // PermissionsService
  ],
  selector: "mixtapemadness-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  // private subscription = new Subscription();
  smallMenuOpen = false;
  userName = '';
  sub = new Subscription();
  constructor(
    private router: Router,
    public appSvc: AppService
  ) { }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub.add(
      this.appSvc.user$.subscribe((user) => {
        if (user) {
          this.userName = user.name;
        }
      })
    )
  }

  signOut(): void {
    // this.cognitoService.signOut()
    // .then(() => {
    //   this.router.navigate(['/signIn']);
    // });
  }

  toggleSmallMenu(tf: boolean) {
    this.smallMenuOpen = tf;
  }

}
