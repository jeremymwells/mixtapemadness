import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mixtapemadness-shows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
})
export class ShowsComponent {

  private _shows = [
    {
      date: '5/27/2023',
      time: '7pm - 11pm',
      notes: 'Everyones dahtahn! Theres Pirates and Steelers, and everything else. Come dahn to the North Shore, enjoy some food and beer',
      location: {
        name: 'Southern Tier',
        address: 'North Shore',
      }
    },
    {
      date: '6/24/2023',
      time: 'closed',
      notes: '',
      location: {
        name: 'Private Party',
        address: 'Boswell PA',
      }
    },
    {
      date: '7/08/2023',
      time: '9pm - 1am',
      notes: '',
      location: {
        name: 'Nova Winery',
        address: 'Pulaski PA',
      }
    },
    {
      date: '7/13/2023',
      time: '9pm - 1am',
      notes: 'Dont nobody know what this is about. We\'re playing a retirement community center or sum\'n?',
      location: {
        name: 'Quality Life Services',
        address: 'Chicora, PA',
      }
    },
    {
      date: '7/22/2023',
      time: '9pm - 1am',
      notes: 'Italian food from the old country. Great people. Great atmosphere.',
      location: {
        name: 'Riardo\'s',
        address: 'New Castle',
      }
    },
    {
      date: '8/25/2023',
      time: '9pm - 1am',
      notes: 'AAAAwwweee SHIT!',
      location: {
        name: 'Nickie Fest (Day 1)',
        address: 'Boswell PA',
      }
    },
    {
      date: '8/26/2023',
      time: '9pm - 1am',
      notes: '',
      location: {
        name: 'Nickie Fest (Day 2)',
        address: 'Boswell PA',
      }
    },
    {
      date: '9/09/2023',
      time: '9pm - 1am',
      notes: '',
      location: {
        name: 'White Township Inn',
        address: 'Beaver Falls PA',
      }
    },
    {
      date: '9/23/2023',
      time: '7pm - 11pm',
      notes: '',
      location: {
        name: 'Southern Tier',
        address: 'North Shore, Pittsburgh, PA',
      }
    },
    {
      date: '9/29/2023',
      time: '9pm - 1am',
      notes: '',
      location: {
        name: 'Mischief On The Mountain',
        address: 'Boswell PA',
      }
    },
    {
      date: '10/07/2023',
      time: 'closed',
      notes: '',
      location: {
        name: 'Private Party',
        address: 'Boswell PA',
      }
    },
    {
      date: '10/14/2023',
      time: '9pm - 1am',
      notes: 'Best wings around. We\'ll be there, fuckin about, playing the digs from the 60s, 70s, 80s and 90s',
      location: {
        name: 'Burg Bar',
        address: 'West Pittsburgh PA',
      }
    },
    {
      date: '10/28/2023',
      time: '9pm - 1am',
      notes: 'This is the gig to catch. Usually the gig that closes the season for Mixtape Madness. Everyone dresses up and gets really loose. Come party.',
      location: {
        name: 'T-Bones Paramount',
        address: 'Wampum PA',
      }
    },
  ];

  pastShows = [] as any;
  futureShows = [] as any;
  constructor() {
    console.log(JSON.stringify(this._shows, null, 4));
    this._shows = this._shows
      .sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        const abOrder = ((aDate < bDate) ? -1 : 1);
        return (aDate === bDate) ? 0 : abOrder;
      });

    this.futureShows = this._shows
      .filter((show: any) => {
        return new Date(show.date).getTime() >= new Date().getTime();
      });

    this.pastShows = this._shows
      .filter((show: any) => {
        return new Date(show.date).getTime() < new Date().getTime();
      });
  }
}
