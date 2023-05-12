import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { akarIcon, akarQuestion } from '@ng-icons/akar-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mixtapemadness-link',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [provideIcons({
    akarIcon
  })],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent {
  @Input() url: any = '' as any;
  @Input() smallText = '';
  @Input() text = '';
  @Input() title = this.smallText || this.text || '';
  @Input() icon = '';
  @Input() class = '';

  isRouterLink() {
    return typeof this.url === 'object';
  }
}
