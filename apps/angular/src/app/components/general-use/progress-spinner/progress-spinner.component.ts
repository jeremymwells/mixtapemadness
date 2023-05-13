import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { akarIcon } from '@ng-icons/akar-icons';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'mixtapemadness-progress-spinner',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  providers: [provideIcons({
    akarIcon
  })],
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent {
  @Input() show = false;
  @Input() message = 'loading';
  ellipsis = ' ';
  holdEmpty = false;
  timeout = 0 as any;
  constructor() {
    this.blinkEllipsis();
  }

  blinkEllipsis() {
    this.timeout = setTimeout(() => {
      if (!this.show) {
        clearTimeout(this.timeout);
      }
      if (this.ellipsis.split('').filter(x => x.trim()).length === 3){
        this.holdEmpty = true;
      }
      if (this.holdEmpty) {
        this.ellipsis = ' ';
        this.holdEmpty = false;
      } else {
        this.ellipsis = this.ellipsis + ' .';
      }
      
      this.blinkEllipsis();
    }, 500);
  }

}
