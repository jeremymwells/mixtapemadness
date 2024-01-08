import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideIcons } from '@ng-icons/core';
import { akarIcon, akarLocation } from '@ng-icons/akar-icons';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../../../general-use/progress-spinner/progress-spinner.component';
import { ShowsService } from '../../../../shows.service';
import { SubHeadComponent } from '../../../general-use/sub-head.component/sub-head.component';



@Component({
  selector: 'mixtapemadness-shows-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    FormsModule,
    ProgressSpinnerComponent,
    SubHeadComponent
  ],
  providers: [ provideIcons({
    akarIcon,
    akarLocation,
  }) ],
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent {
  @Input() showToggle = true;
  @Input() collapseBuffers = false;
  @Input() showButtons = true;
  @Input() zoom = 1;

  get mtmShowRowStyle() {
    return [
      `zoom: ${this.zoom}`,
      `margin-left: calc(1em * ${this.zoom})`,
      `margin-top: calc(1em * ${this.zoom})`,
      `margin-bottom: calc(1em * ${this.zoom})`,
      `padding-top: calc(.5em * ${this.zoom})`,
      `padding-bottom: calc(.5em * ${this.zoom})`,
      `font-size: calc(1em * ${this.zoom})`,
      `line-height: calc(15px * ${this.zoom})`,
    ].join(';')
  }
  constructor(
    public showsService: ShowsService
  ) { }
}
