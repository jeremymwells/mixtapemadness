import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { akarPencil, akarTrashCan, akarPlus, akarImage } from '@ng-icons/akar-icons';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  MatDialogModule
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'mixtapemadness-admin-home',
  standalone: true,
  providers: [
    provideIcons({ akarPencil, akarTrashCan, akarPlus, akarImage }),
    // PermissionsService
  ],
  imports: [
    CommonModule,
    SubHeadComponent,
    FlexLayoutModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
  ],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    return;
  }
  ngOnInit(): void {
    return;
  } 
  

}
