import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule, MediaObserver } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  akarIcon,
  akarChevronLeft,
  akarLinkOut,
} from '@ng-icons/akar-icons';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubHeadComponent } from '../../../general-use/sub-head.component/sub-head.component';
import { AboutService } from '../about.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { Subscription } from 'rxjs';
import { LinkComponent } from '../../../general-use/link/link.component';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'mixtapemadness-person',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SubHeadComponent,
    NgImageSliderModule,
    LinkComponent
  ],
  providers: [ AboutService ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  imagesLoaded = false;
  personOrPersons: any;
  otherPersons: any;

  constructor(
    private route: ActivatedRoute,
    private appSvc: AppService,
    private aboutService: AboutService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.mediaObserver
      .asObservable()
      .subscribe(() => {
        this.initRouteParameters();
      })
    );
  }

  initRouteParameters() {
    this.personOrPersons = undefined;
    this.otherPersons = undefined;
    this.subscription.add(this.route.paramMap.subscribe(params => {
      this.personOrPersons = this.aboutService.getPersonOrPersons(params.get('personOrPersons'));
      this.otherPersons = this.aboutService.getNotPersonOrPersons(params.get('personOrPersons'));
      setTimeout(() => {
        this.imagesLoaded = true;
      }, 1500);
      this.appSvc.setBackButton(this.personOrPersons.isUs ? ['/home']: ['/about']);
    }))
  }
}
