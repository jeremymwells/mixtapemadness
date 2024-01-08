import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription, forkJoin } from 'rxjs';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideIcons } from '@ng-icons/core';
import { akarIcon, akarLocation } from '@ng-icons/akar-icons';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../../general-use/progress-spinner/progress-spinner.component';
import { AppService } from '../../../app.service';
import { ShowsListComponent } from './shows-list/shows-list.component';


@Component({
  selector: 'mixtapemadness-shows',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SubHeadComponent,
    FlexLayoutModule,
    MatSlideToggleModule,
    FormsModule,
    ProgressSpinnerComponent,
    ShowsListComponent,
  ],
  providers: [ provideIcons({
    akarIcon,
    akarLocation,
  }) ],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent {
  // private sub = new Subscription();
  // private _currentYear = new Date().getFullYear();
  // private _showYears = [2022, 2023, 2024, 2025]; // new Array(this._currentYear - 2022).map((_,i) => this._currentYear - i);
  // private _shows = [] as any[];

  // showsLoaded = false;
  // pastShows = [] as any;
  // futureShows = [] as any;
  // showPastShows = false;
  // displayShows = [] as any;
  // title = '';

  constructor(
    private http: HttpClient,
    public appSvc: AppService
  ) {

    // this.sub.add(
    //   forkJoin(
    //     this._showYears.map((showYear) => 
    //       this.http.get(`api/shows?year=${showYear}`)
    //     )
    //   )
    //   .subscribe((showsByYear: any) => {
    //     showsByYear.forEach((showYearShows: any[]) => {
    //       this._shows = [
    //         ...this._shows,
    //         ...showYearShows
    //       ];
    //     })

    //     this.sortAndDivideShows();
    //   })
    // );
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  // getDisplayDate(show: any) {
  //   const monthNames = ["January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];
  //   const showDate = new Date(show.dateAndTime);
  //   const month = monthNames[showDate.getMonth()];
  //   const date = showDate.getDate();
  //   const year = showDate.getFullYear()
  //   return String(`${month} ${date}, ${year}`);
  // }

  // getDisplayAddress(show: any) {
  //   const address = show.address;
  //   const city = show.city;
  //   const state = show.state;
  //   const cityState = [city, state].filter(x => x).join(' ');
  //   const addressCityState = [
  //     address,
  //     cityState
  //   ]
  //   .filter(x => x)
  //   .join(', ')
  //   return addressCityState;
  // }

  // getEncodedAddress(show: any) {
  //   return encodeURI(this.getDisplayAddress(show))
  // }

  // getEncodedVenue(show: any) {
  //   return encodeURI(show.venue)
  // }

  // getDuration(show: any) {
  //   const showDate = new Date(show.dateAndTime);
  //   const endDate = new Date(show.dateAndTime);
  //   endDate.setTime(showDate.getTime() + (show.duration*60*60*1000));
  //   let startTime = showDate.toLocaleTimeString('en-US');
  //   let endTime = endDate.toLocaleTimeString('en-US');

  //   // format the times
  //   [
  //     [':00:00', ''],
  //     [':15:00', ':15'],
  //     [':30:00', ':30'],
  //     [':45:00', ':45'],
  //   ].map(([thisString, withThisString]) => {
  //     startTime = startTime.replace(thisString, withThisString);
  //     endTime = endTime.replace(thisString, withThisString);
  //   });

  //   return String(`${startTime} - ${endTime}`);
    
  // }

  // toggleShows() {
  //   this.showPastShows = !this.showPastShows;
  //   this.setTitle();
  //   this.setDisplayShows();
  // }

  // getTitle(pastShows: boolean) {
  //   return pastShows ? 'Past Shows' : 'Upcoming Shows';
  // }

  // setDisplayShows() {
  //   this.displayShows = this.showPastShows ?
  //     this.pastShows :
  //     this.futureShows;
  // }

  // setTitle() {
  //   this.title = this.getTitle(this.showPastShows);
  // }

  // sortAndDivideShows() {
  //   this._shows = this._shows
  //     .sort((a, b) => {
  //       const aDate = new Date(a.dateAndTime).getTime();
  //       const bDate = new Date(b.dateAndTime).getTime();
  //       const abOrder = ((aDate < bDate) ? -1 : 1);
  //       return (aDate === bDate) ? 0 : abOrder;
  //     });

  //   this.futureShows = this._shows
  //     .filter((show: any) => {
  //       return new Date(show.dateAndTime).getTime() >= new Date().getTime();
  //     });

  //   this.pastShows = this._shows
  //     .filter((show: any) => {
  //       return new Date(show.dateAndTime).getTime() < new Date().getTime();
  //     }).reverse();

  //   this.setDisplayShows();
  //   this.setTitle();
  //   setTimeout(() => {
  //     this.showsLoaded = true;
  //   }, 2000)
  // }
}
