import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '../../general-use/link/link.component';

@Component({
  selector: 'mixtapemadness-socials',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LinkComponent
  ],
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {
  // https://www.youtube.com/embed/gM7YzpKLwOU?listType=playlist&autoPlay=1&controls=0&iv_load_policy=3&list=UUHw-oxqEFy_jZwXUvAORgog&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A4200&widgetid=1
}
