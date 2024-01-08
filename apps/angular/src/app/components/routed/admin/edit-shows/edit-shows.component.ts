import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../../general-use/sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, Subscription, forkJoin, mergeMap, tap } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { provideIcons } from '@ng-icons/core';
import { akarPencil, akarTrashCan, akarPlus } from '@ng-icons/akar-icons';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import { provideIcons } from '@ng-icons/core';
// import { akarIcon, akarLinkOut } from '@ng-icons/akar-icons';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditCreateShowDialogComponent } from '../edit-create-show-dialog/show-dialog.component';
import { Show } from '../edit-create-show-dialog/show.model';
// import { PermissionsService } from '../../../auth-guard';

const datefmt = (dateAndTime: string, asDate = false) => {

  if (dateAndTime) {
    const showDate = new Date(dateAndTime);
    const month = showDate.getMonth();
    const date = showDate.getDate();
    const year = showDate.getFullYear();
    const strMonth = month + 1 < 10 ? `0${month+1}`: month + 1
    return asDate ? 
      new Date(year, month, date):
      [strMonth, date, year].join('/');
  }
  return '';
}

@Component({
  selector: 'mixtapemadness-admin-edit-shows',
  standalone: true,
  providers: [
    provideIcons({ akarPencil, akarTrashCan, akarPlus }),
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
    MatNativeDateModule
  ],
  templateUrl: './edit-shows.component.html',
  styleUrls: ['./edit-shows.component.scss'],
})
export class EditShowsComponent implements OnInit, OnDestroy { //implements OnInit, OnDestroy {
  private sub = new Subscription();
  private upsertShow$ = new Subject();
  shows = [] as any[];
  displayedColumns: string[] = ['cron', 'date', 'time', 'venue', 'phone', 'address', 'edit'];
  dataSource = this.appSvc.showsService.displayShows || [];
  downloadShows= [];
  lastMigrationDate = 1705501356264 // 1/17/2024
  get lastMigrationDateFmt() {
    return datefmt(this.lastMigrationDate as any)
  }
  showSecretRow = false;
  constructor(
    // private _router: Router,
    public appSvc: AppService,
    public dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.appSvc.reinitShows();
    this.appSvc.setBackButton(['/admin']);

    this.sub.add(this.appSvc.showsSplit$.subscribe((next: any) => {
      this.downloadShows =  next.shows.filter((show: Show | any) => show.createdDate > this.lastMigrationDate)
      this.dataSource = [
        ...(next.futureShows || []),
        ...(next.pastShows || [])
      ].map((show) => { 
        return {
          cron: !this.appSvc.showsService.isPastShow(show) ? 'upcoming': 'past',
          ...show
        }
      })
    }));

    this.sub.add(
      this.upsertShow$.pipe(
        mergeMap((show) =>
          this.appSvc.showsService.upsertShow(show)
        ),
        // tap(() => this.appSvc.reinitShows())
      )
      .subscribe((r) => {
        console.log(r);
        this.appSvc.reinitShows();
      })
    );
  }

  async openDialog(show?: Show) {
    const dialogRef = this.dialog.open(EditCreateShowDialogComponent, {
      data: show,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        // closed or canceled
        return;
      }
      const show = {
        createdBy: this.appSvc.session.dataUserName,
        createdDate: Date.now(),
        ...result,
        year: +result.year,
        duration: +result.duration,
        lastEditedBy: this.appSvc.session.dataUserName,
        lastEditedDate: Date.now()
      };
      this.upsertShow$.next(show);
    });
  }

  formatPhoneNumber (str: string) {
    // return str;
    //Filter only numbers from the input
    // const cleaned = ('' + str).replace(/\D/g, '');
    
    // //Check if the input is of correct length
    const match = str.match(/^([\\+1]{2})(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
    };
    return str;
    // return null
  };

  get downloadJsonHref() {
    return [
      'data:text/json;charset=utf-8,',
      encodeURIComponent(JSON.stringify(this.downloadShows, null, 4)),
    ].join('')
  }

}
