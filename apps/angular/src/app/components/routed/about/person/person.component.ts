import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
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

@Component({
  selector: 'mixtapemadness-person',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SubHeadComponent,
  ],
  providers: [
    AboutService,
    // ActivatedRoute,
  ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  personOrPersons = {} as any;

  constructor(
    private route: ActivatedRoute,
    private aboutService: AboutService
  ) {
    this.route.paramMap.subscribe(params => {
      this.personOrPersons = this.aboutService.getPersonOrPersons(params.get('personOrPersons'));
      console.log('ROUTED PERSON OR PERSONS', this.personOrPersons);
    });
  }
}
