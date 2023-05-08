import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips'
import { Subscription, forkJoin } from 'rxjs';
import { SubHeadComponent } from '../sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideIcons } from '@ng-icons/core';
import { akarIcon, akarLocation } from '@ng-icons/akar-icons';

@Component({
  selector: 'mixtapemadness-shows',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SubHeadComponent,
    MatChipsModule,
    FlexLayoutModule,
  ],
  providers: [ provideIcons({
    akarIcon,
    akarLocation,
  }) ],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnDestroy {
  private sub = new Subscription();
  private _showYears = [2022, 2023, 2024];
  private _shows = [] as any[];

  pastShows = [] as any;
  futureShows = [] as any;
  showPastShows = false;
  displayShows = [] as any;
  title = '';

  constructor(private http: HttpClient) {
    this.sub.add(
      forkJoin(
        this._showYears.map((showYear) => 
          this.http.get(`api/shows?year=${showYear}`)
        )
      )
      .subscribe((showsByYear: any) => {
        showsByYear.forEach((showYearShows: any[]) => {
          this._shows = [
            ...this._shows,
            ...showYearShows
          ];
        })

        this.sortAndDivideShows();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getDisplayDate(show: any) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const showDate = new Date(show.dateAndTime);
    const month = monthNames[showDate.getMonth()];
    const date = showDate.getDate();
    const year = showDate.getFullYear()
    return String(`${month} ${date}, ${year}`);
  }

  getDisplayAddress(show: any) {
    const address = show.address;
    const city = show.city;
    const state = show.state;
    const cityState = [city, state].filter(x => x).join(' ');
    const addressCityState = [
      address,
      cityState
    ]
    .filter(x => x)
    .join(', ')
    return addressCityState;
  }

  getEncodedAddress(show: any) {
    return encodeURI(this.getDisplayAddress(show))
  }

  getEncodedVenue(show: any) {
    return encodeURI(show.venue)
  }

  getDuration(show: any) {
    const showDate = new Date(show.dateAndTime);
    const endDate = new Date(show.dateAndTime);
    endDate.setTime(showDate.getTime() + (show.duration*60*60*1000));
    const startTime = showDate.toLocaleTimeString('en-US').replace(':00:00', '');
    const endTime = endDate.toLocaleTimeString('en-US').replace(':00:00', '');
    return String(`${startTime} - ${endTime}`);
    
  }

  toggleShows() {
    this.showPastShows = !this.showPastShows;
    this.setTitle();
    this.setDisplayShows();
  }

  setDisplayShows() {
    this.displayShows = this.showPastShows ?
      this.pastShows :
      this.futureShows;
  }

  setTitle() {
    this.title = this.showPastShows ? 'Previous Shows' : 'Upcoming Shows';
  }

  sortAndDivideShows() {
    this._shows = this._shows
      .sort((a, b) => {
        const aDate = new Date(a.dateAndTime).getTime();
        const bDate = new Date(b.dateAndTime).getTime();
        const abOrder = ((aDate < bDate) ? -1 : 1);
        return (aDate === bDate) ? 0 : abOrder;
      });

    this.futureShows = this._shows
      .filter((show: any) => {
        return new Date(show.dateAndTime).getTime() >= new Date().getTime();
      });

    this.pastShows = this._shows
      .filter((show: any) => {
        return new Date(show.dateAndTime).getTime() < new Date().getTime();
      }).reverse();

    this.setDisplayShows();
    this.setTitle();
    console.log('pastShows', this.pastShows);
    console.log('futureShows', this.futureShows);
  }
}
