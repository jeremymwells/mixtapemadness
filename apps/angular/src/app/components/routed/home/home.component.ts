import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'mixtapemadness-home',
  standalone: true,
  imports: [
    CommonModule,
    SubHeadComponent,
    FlexLayoutModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
