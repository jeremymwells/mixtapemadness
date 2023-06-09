import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  akarIcon,
  akarChevronLeft,
  akarLinkOut,
} from '@ng-icons/akar-icons';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'mixtapemadness-sub-head',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    YouTubePlayerModule,
    FlexLayoutModule,
    NgIconComponent,
    MatSlideToggleModule,
  ],
  providers: [provideIcons({
    akarIcon,
    akarChevronLeft,
    akarLinkOut
  })],
  templateUrl: './sub-head.component.html',
  styleUrls: ['./sub-head.component.scss']
})
export class SubHeadComponent {
  
  // @Input() backLink: any = '/';
  // @Input() backLinkTitle = 'Go Back';
  // @Input() title = '';
  // @Input() linkOut = '';
  // @Input() linkOutTitle = 'Leave Mixtape Madness';
  // @Input() hideBackLink = false;
  // @Input() hideLinkOutLink = false;
  // @Input() sectionWidth = 50;
  // @Input() nudgeTitleRight = false;
  // leftWidth = 100 - this.sectionWidth;
  // rightWidth = 100 - this.sectionWidth;
}
