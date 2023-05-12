import { Injectable } from '@angular/core';

class PersonOrPersons {
  private _currentPic = '';
  
  title = 'How It All Began';
  writeup = [] as string[];
  pics = [] as string[];
  isUs = false;

  get key(): string {
    if (this.isUs) {
      return 'us';
    }
    return this.title.split(' ')[1].toLowerCase();
  }

  get link() {
    return [this.key];
  }

  get currentPic() {
    return this._currentPic;
  }

  constructor(p: PersonOrPersons | any) {
    Object.assign(this, p);
    this._currentPic = p.pics[0];
  }

  swapCurrentPic() {
    this._currentPic = (this._currentPic === this.pics[0]) ? this.pics[1]: this.pics[0];
  }

}

@Injectable()
export class AboutService {
  private personOrPersons = [
    new PersonOrPersons(
      {
        title: 'About',
        writeup: [
          'Some dudes knew each other when they were kids. The played in bands, and did some cool shit.',
          'Then life happened, and they went separate ways for some number of years...',
          'And then they came back. Slowly but surely.',
          'And now they\'re here, to come again, in your ear pussies'
        ],
        pics: [
          'assets/images/mixtapemadness_logo_green.png',
          'assets/images/mixtapemadness_logo_green.png'
        ],
        isUs: true
      }
    ),
    new PersonOrPersons(
      {
        title: 'Jason Harvey',
        writeup: ['blah blah bloody blah blah'],
        pics: [
          'assets/images/about/HarveyColor.jpeg',
          'assets/images/about/HarveyBW.jpeg'
        ]
      }
    ),
    new PersonOrPersons(
      {
        title: 'Brian Ippolito',
        writeup: ['blah blah bloody blah blah'],
        pics: [
          'assets/images/about/HarveyColor.jpeg',
          'assets/images/about/HarveyBW.jpeg'
        ]
      }
    ),
    new PersonOrPersons(
      {
        title: 'Jason Stachowiak',
        writeup: ['blah blah bloody blah blah'],
        pics: [
          'assets/images/about/StoveColor.jpeg',
          'assets/images/about/StoveBW.jpeg'
        ]
      }
    ),
    new PersonOrPersons(
      {
        title: 'Jeremy Wells',
        writeup: ['blah blah bloody blah blah'],
        pics: [
          'assets/images/about/HarveyColor.jpeg',
          'assets/images/about/HarveyBW.jpeg'
        ]
      }
    )
  ];

  getPersonOrPersons(personOrPerson: string | null) {
    return [
      ...this.personOrPersons.filter(p => p.key === personOrPerson?.toLowerCase()),
      ...this.personOrPersons.filter(p => p.isUs)
    ][0];
  }
}