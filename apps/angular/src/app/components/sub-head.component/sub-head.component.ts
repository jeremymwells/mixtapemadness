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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mixtapemadness-sub-head',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    YouTubePlayerModule,
    FlexLayoutModule,
    NgIconComponent
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
  @Input() backLink = [''];
  @Input() backLinkTitle = 'Go Back';
  @Input() title = '';
  @Input() linkOut = '';
  @Input() linkOutTitle = 'Leave Mixtape Madness';
  @Input() hideBackLink = false;
  @Input() hideLinkOutLink = false;
  @Input() sectionWidth = 50;
  leftWidth = 100 - this.sectionWidth;
  rightWidth = 100 - this.sectionWidth;
}
