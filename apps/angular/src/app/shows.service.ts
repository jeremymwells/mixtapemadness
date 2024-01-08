/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Subject, Subscription, firstValueFrom, forkJoin, map, tap } from 'rxjs';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private _sub = new Subscription();

  private _showYears = [2022, 2023, 2024, 2025];
  private _shows = [] as any[];
  title = '';
  showPastShows = false;
  displayShows = [] as any[];
  pastShows = [] as any[];
  futureShows = [] as any[];
  showsLoaded = false;
  showsSplit$ = new Subject<any>();
  showHash: any = {}
  // _http = inject(HttpClient);
  constructor(
    private _http: HttpClient,
  ) {
    this.init(true);
  }

  init(reinit = false): void {
    if (!reinit) { return; }
    if (this._sub && (this._sub as any).unsubscribe) { (this._sub as any).unsubscribe()}

    this._sub = new Subscription();
    this._sub.add(
      forkJoin(
        this._showYears.map((showYear) => 
          this._http.get(`api/shows?year=${showYear}`)
        )
      )
      .subscribe((showsByYear: any) => {
        showsByYear.forEach((showYearShows: any[]) => {      

          [
            ...this._shows,
            ...showYearShows
          ].forEach((x: any) => {
            this.showHash[x.dateAndTime] = x
          });

          this._shows = Object.values(this.showHash);

          this.sortAndDivideShows();
          this.showsSplit$.next({
            futureShows: this.futureShows,
            pastShows: this.pastShows,
            displayShows: this.displayShows,
            shows: this._shows
          })
        });
      })
    );
  }

  reinitShows() {
    this._shows = [];
    this.init(true);
  }

  upsertShow(show: any) {
    return this._http.post(`api/shows`, show, { responseType: 'text' });
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
    let startTime = showDate.toLocaleTimeString('en-US');
    let endTime = endDate.toLocaleTimeString('en-US');

    // format the times
    [
      [':00:00', ''],
      [':15:00', ':15'],
      [':30:00', ':30'],
      [':45:00', ':45'],
    ].map(([thisString, withThisString]) => {
      startTime = startTime.replace(thisString, withThisString);
      endTime = endTime.replace(thisString, withThisString);
    });

    return String(`${startTime} - ${endTime}`);
    
  }

  toggleShows() {
    this.showPastShows = !this.showPastShows;
    this.setTitle();
    this.setDisplayShows();
  }

  getTitle(pastShows: boolean) {
    return pastShows ? 'Past Shows' : 'Upcoming Shows';
  }

  setDisplayShows() {
    this.displayShows = this.showPastShows ?
      this.pastShows :
      this.futureShows;
  }

  setTitle() {
    this.title = this.getTitle(this.showPastShows);
  }

  isPastShow(show: { dateAndTime: number }) {
    return new Date(show.dateAndTime).getTime() < new Date().getTime()
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
      .filter((show: any) => !this.isPastShow(show));

    this.pastShows = this._shows
      .filter((show: any) => this.isPastShow(show)).reverse();

    this.setDisplayShows();
    this.setTitle();
    setTimeout(() => {
      this.showsLoaded = true;
    }, 2000)
  }

}

