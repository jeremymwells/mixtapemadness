import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppService } from '../../../app.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { akarIcon, akarLinkOut } from '@ng-icons/akar-icons';

@Component({
  selector: 'mixtapemadness-home',
  standalone: true,
  imports: [
    CommonModule,
    SubHeadComponent,
    FlexLayoutModule,
    RouterModule,
  ],
  providers: [
    // provideIcons({ akarIcon,  akarLinkOut }),
    AppService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public appSvc: AppService
  ) { }
}
