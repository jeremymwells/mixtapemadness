import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { akarIcon, akarThreeLineHorizontal, akarLinkOut } from '@ng-icons/akar-icons';
import { HeaderComponent } from './components/general-use/header/header.component';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './components/general-use/link/link.component';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    LinkComponent,
    NgIconComponent
  ],
  providers: [
    provideIcons({ akarIcon, akarThreeLineHorizontal, akarLinkOut }),
    AppService
  ],
  selector: "mixtapemadness-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  // private subscription = new Subscription();
  smallMenuOpen = false;
  constructor(
    private router: Router,
    public appSvc: AppService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    return;
    // this.subscription.add(this.router.routerState.root.paramMap.subscribe(params => {
    //   console.log('HERERERERE')
    //   this.appSvc.setBackButton(params.get('personOrPersons')? ['/about']: ['/home'])
    // }))
  }
  toggleSmallMenu(tf: boolean) {
    this.smallMenuOpen = tf;
  }

}
