import { Component, Input, Output, EventEmitter } from '@angular/core';
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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mixtapemadness-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    NgIconComponent
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
  @Input() smallMenuOpen = false;
  @Output() toggleSmallMenu  = new EventEmitter<boolean>();
  srcOne = 'assets/images/mixtape_center_logo.png';
  srcTwo = 'assets/images/mixtape_center_logo_hover.png';
  logoImageSrc = this.srcOne;

  toggleSmallMenuState() {
    this.toggleSmallMenu.emit(!this.smallMenuOpen);
  }
}
