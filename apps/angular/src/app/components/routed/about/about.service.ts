import { Injectable } from '@angular/core';

class PersonOrPersons {
  private _currentThumb;
  
  title = 'How It All Began';
  writeup = [] as string[];
  images = [] as Image[];
  isUs = false;
  key = 'unknown';

  get link() {
    return [`../${this.key}`];
  }

  get currentThumb() {
    return this._currentThumb;
  }

  constructor(p: PersonOrPersons | any) {
    Object.assign(this, p);
    this._currentThumb = p.images[0];
  }

  swampThumb() {
    this._currentThumb = (this._currentThumb === this.images[0]) ? this.images[1]: this.images[0];
  }

}

class Image {
  get image() {
    return this.src;
  }
  get thumbImage() {
    return this.src;
  }
  constructor(
    public src = '',
    public alt = '',
    public title = '',
  ) { }
}

@Injectable()
export class AboutService {
  persons = [
    new PersonOrPersons({
      key: 'us',
      title: 'About Mixtape Madness',
      writeup: [
        `
        Some dudes knew each other when they were kids. The played in bands, and did some cool shit.
        At one point, there was a metal band, and some other shit. Then there was belly dancing and drum circles and shit.
        Then there was a 12 Gauge Justice band. Once Brian's mom dressed up like Brian for Halloween.
        By their powers combined, they are captain planet. He's your hero-- gonna take pollution down to zero. HEART!
        `,
        '','',
        'Go go, Power Rangers. Duck Tales - WOO-OOO',
        '','',
        'Blathering Blatherskite',
        '','',
        'Then life happened, and they went separate ways for some number of years...',
        'And then they came back. Slowly but surely.',
        'And now they\'re here, to come again, in your ear pussies',
        ' ',' ',
        ' ',' ',
      ],
      images: [
        new Image('assets/images/about/mixtape.png'),
        new Image('assets/images/about/mixtape1.png'),
        new Image('assets/images/about/mixtape2.png'),
        new Image('assets/images/about/mixtape3.png'),
        new Image('assets/images/about/mixtape4.png'),
        new Image('assets/images/about/mixtape5.png'),
      ],
      isUs: true
    }),
    new PersonOrPersons({
      key: 'harvey',
      title: 'Jason Harvey',
      writeup: ['blah blah bloody blah blah'],
      images: [
        new Image('assets/images/about/harvey_thumb1.jpeg'),
        new Image('assets/images/about/harvey_thumb2.jpeg'),
        new Image('assets/images/about/harvey1.png'),
        new Image('assets/images/about/harvey2.png'),
        new Image('assets/images/about/harvey3.png'),
        new Image('assets/images/about/harvey4.png'),
      ]
    }),
    new PersonOrPersons({
      key: 'brian',
      title: 'Brian Ippolito',
      useLastName: false,
      writeup: ['blah blah bloody blah blah'],
      images: [
        new Image('assets/images/about/brian_thumb1.jpeg'),
        new Image('assets/images/about/brian2.png'),
        new Image('assets/images/about/brian_thumb2.jpeg'),
        new Image('assets/images/about/brian1.png'),
        new Image('assets/images/about/brian3.jpeg'),
        new Image('assets/images/about/brian4.png'),
      ]
    }),
    new PersonOrPersons({
      key: 'stove',
      title: 'Jason Stachowiak',
      writeup: ['blah blah bloody blah blah'],
      images: [
        new Image('assets/images/about/stove_thumb1.jpeg'),
        new Image('assets/images/about/stove_thumb2.jpeg'),
        new Image('assets/images/about/stove1.png'),
        new Image('assets/images/about/stove3.png'),
        new Image('assets/images/about/stove4.png'),
        new Image('assets/images/about/stove5.png'),
      ]
    }),
    new PersonOrPersons({
      key: 'jeremy',
      title: 'Jeremy Wells',
      writeup: ['blah blah bloody blah blah'],
      useLastName: false,
      images: [
        new Image('assets/images/about/jeremy_thumb2.png'),
        new Image('assets/images/about/jeremy_thumb1.png'),
        new Image('assets/images/about/jeremy3.png'),
        new Image('assets/images/about/jeremy4.png'),
        new Image('assets/images/about/jeremy6.png'),
      ]
    }),
  ];

  getPersonOrPersons(personOrPerson: string | null): PersonOrPersons {
    return [
      ...this.persons.filter(p => p.key.toLowerCase() === personOrPerson?.toLowerCase()),
      ...this.persons.filter(p => p.isUs)
    ][0];
  }

  getNotPersonOrPersons(personOrPerson: string | null): PersonOrPersons[] {
    const pers = this.getPersonOrPersons(personOrPerson);
    const others = this.persons.filter((p) => p.title !== pers.title);
    console.log('OTHERS', others);
    return others;
  }
}

