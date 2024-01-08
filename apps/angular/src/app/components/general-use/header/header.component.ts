import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  akarIcon,
  akarThreeLineHorizontal,
  akarYoutubeFill,
  akarFacebookFill,
  akarCross,
} from '@ng-icons/akar-icons';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';
import { Subscription } from 'rxjs';
import { LinkComponent } from '../link/link.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mixtapemadness-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    NgIconComponent,
    LinkComponent,
    MatButtonModule
  ],
  providers: [ provideIcons({
    akarIcon,
    akarThreeLineHorizontal,
    akarYoutubeFill,
    akarFacebookFill,
    akarCross
  }) ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() userName = '';
  @Input() smallMenuOpen = false;
  @Output() toggleSmallMenu  = new EventEmitter<boolean>();

  srcOne = 'assets/images/mixtape_center_logo.png';
  srcTwo = 'assets/images/mixtape_center_logo_hover.png';
  logoImageSrc = this.srcOne;
  currentPath = document.location.pathname;

  showLogoutButton = false;
  constructor(
    public appSvc: AppService,
  ) { }
  
  toggleSmallMenuState() {
    this.toggleSmallMenu.emit(!this.smallMenuOpen);
  }
}
