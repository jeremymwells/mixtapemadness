import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import {FormControl, FormsModule, FormGroup, ReactiveFormsModule, NgModel, Validators, NgForm, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { provideIcons } from '@ng-icons/core';
import { akarClock } from '@ng-icons/akar-icons';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Show } from './show.model';
import { Observable, map, startWith } from 'rxjs';

const v = (vs: any[]) => [
  Validators.required,
  ...vs
];

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

const timefmt = (dateAndTime: string, reverse = false) => {
  if (dateAndTime) {
    const showTime = new Date(dateAndTime);
    const showHours = showTime.getHours();
    const showMinutes = showTime.getMinutes()

    return !reverse ? 
      [
        `${showHours - 12}:${showMinutes}`,
        showHours >= 12 ? 'PM' : 'AM'
      ].join(' ') :
      [
        showHours,
        showMinutes < 10 ? `0${showMinutes}` : showMinutes
      ].join(':')

  }
  return '';
}

const phonefmt = (phone: string) => {
  phone = phone.trim();
  if (phone.indexOf('+') !== 0) {
    phone = `+${phone}`;
  }
  if (phone.indexOf('1') !== 1) {
    const parts = phone.split('+');
    phone = `1${parts[1]}`
  }
  phone = `+${phone.replace(/\D/g,'')}`;
  return phone;
}

function ValidateTime(control: AbstractControl): {[key: string]: any} | null  {
  const [time, ampm] = control.value.split(' ');
  const [hours, minutes] = time.split(':');
  const invalid = { 'timeInvalid': true };
  if (ampm && !ampm.toLowerCase().includes('p') && !ampm.toLowerCase().includes('a')) {
    return invalid;
  }
  if (isNaN(hours) || isNaN(minutes)) {
    return invalid;
  }
  if (+hours <= 0 && +hours > 12) {
    return invalid;
  }
  if (minutes !== '00' && minutes !== '15' && minutes !== '30' && minutes !== '45') {
    return invalid;
  }
  control.setErrors(null);
  return null;
}

@Component({
  selector: 'mixtapemadness-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  providers: [
    provideIcons({ akarClock }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditCreateShowDialogComponent implements OnInit {
  private _states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 
    'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 
    'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 
    'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 
    'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 
    'VA', 'WA', 'WV', 'WI', 'WY'
  ]
  states!: Observable<string[]>;
  @ViewChild('picker') picker: any;
  @ViewChild('form', { read: NgForm }) form: any;
  date = new FormControl(datefmt(this.data?.dateAndTime, true), v([]));
  time = new FormControl(timefmt(this.data?.dateAndTime), v([ValidateTime]));
  duration = new FormControl(this.data?.duration || 3, v([]));
  venue = new FormControl(this.data?.venue, v([]));
  address = new FormControl(this.data?.address);
  city = new FormControl(this.data?.city);
  state = new FormControl(this.data?.state);
  phone = new FormControl(this.data?.phone);
  constructor(
    public dialogRef: MatDialogRef<EditCreateShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Show | any
  ) {}

  submit() {
    console.log(this.form.valid);
    
    this.dialogRef.close({
      ...this.data || {},
      action: this.data ? 'update' : 'create',
      date: this.date.value,
      time: this.time.value,
      duration: this.duration.value,
      venue: this.venue.value,
      address: this.address.value,
      city: this.city.value,
      state: this.state.value,
      phone: phonefmt(this.phone.value),
      dateAndTime: this.getDateAndTime(),
      year: new Date(this.getDateAndTime()).getFullYear()
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._states.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.states = this.state.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getDateAndTime() {
    return [
      datefmt(this.date?.value as any),
      timefmt(
        `${datefmt(this.date?.value as any)} ${this.time.value as any}`,
        true
      )
    ].join(' ');
  }

  formValid() {
    const ctrls = [this.date, this.time, this.duration, this.venue, this.address, this.city, this.state];
    for(let i = 0; i < ctrls.length; i++) {
      // if creating new show
      if (!this.data) {
        if (ctrls[i].dirty && !ctrls[i].valid) {
          return false;
        }
      }
      // if editing existing show
      if (!ctrls[i].valid && !ctrls[i].untouched) {
        return false;
      }

    }
    return true;
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  dateFilter = (date?: any): boolean => {
    const dateString = datefmt(date).toString();
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString || '')) {
      return false;
    }

    // Parse the date parts to integers
    const parts = dateString?.split("/") || [];
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 2023 || year > 2050 || month == 0 || month > 12){
      return false;
    }
        

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }
        

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };
}