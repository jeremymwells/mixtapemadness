import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../../general-use/sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { provideIcons } from '@ng-icons/core';
import { akarPencil, akarTrashCan, akarPlus } from '@ng-icons/akar-icons';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
// import { MatLegacySliderModule } from '@angular/material/legacy-slider';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppService } from '../../../../app.service';
import { ShowsListComponent } from '../../shows/shows-list/shows-list.component';


@Component({
  selector: 'mixtapemadness-admin-banner',
  standalone: true,
  providers: [
    provideIcons({ akarPencil, akarTrashCan, akarPlus }),
    // PermissionsService
  ],
  imports: [
    CommonModule,
    SubHeadComponent,
    FlexLayoutModule,
    // MatLegacySliderModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ShowsListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.scss'],
})
export class AdminBannerComponent implements OnInit, OnDestroy {
  @ViewChild('chrome') chrome: any;

  picZoomValue = 100;
  showsZoomValue = 100;

  get picZoomSlideValue() {
    return Math.round(this.picZoom * 100);
  }

  get showsZoomSlideValue() {
    return Math.round(this.showsZoom * 100);
  }

  get picZoom() {
    return this.picZoomValue / 100;
  }

  get showsZoom() {
    return this.showsZoomValue / 100;
  }

  pictop = 100;
  texttop = 100;

  get picStyle() {
    const top = (this.pictop - 100);
    return (this.picZoom === 1) ? 
    `top: ${top}px` :
    [
      `zoom: ${this.picZoom}`,
      'text-align: right;',
      `padding-right: calc(1.5em * ${this.picZoom})`,
      `top: ${top}px`
      // `padding: 0 calc(5em * ${this.picZoom})`
    ].join('; ');
  }

  get rowStyle() {
    return this.picZoom === 1 ? 
      '':
      [
        `min-height: calc(88.5% * ${this.picZoom})`,
        `width: calc(95% * ${this.picZoom})`,
        `left: calc(${100 - this.picZoomSlideValue}% * ${this.picZoom} - 1%)`,
        // `padding: 0 calc(5em * ${this.picZoom}) 0 calc(5em * ${this.picZoom})`
      ].join('; ')
  }

  constructor(
    private _appSvc: AppService
  ) { }

  ngOnDestroy(): void {
    return;
  }
  ngOnInit(): void {
    this._appSvc.setBackButton(['/admin']);
  } 

  updateShowZoom(e: any) {
    console.log(e);
  }
  
  updatePicZoom(e: any) {
    console.log(e);
  }

  downloadPng() {
    // toPng(this.chrome.nativeElement)
    // .then((dataUrl) => {
    //   console.log('HEREEEE')
    //   const img = new Image();
    //   img.src = dataUrl;
    //   document.body.appendChild(img);
    // })
    // .catch(function (error) {
    //   console.error('oops, something went wrong!', error);
    // });
  }

}
