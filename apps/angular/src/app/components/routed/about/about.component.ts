import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AboutService } from './about.service';

@Component({
  selector: 'mixtapemadness-about',
  standalone: true,
  imports: [
    CommonModule,
    SubHeadComponent,

    RouterModule,
  ],
  providers: [
    AboutService,
    // ActivatedRoute,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  personOrPersons: any;
  constructor(
    private route: ActivatedRoute,
    private aboutService: AboutService
  ) {
    this.route.paramMap.subscribe(params => {
      this.personOrPersons = this.aboutService.getPersonOrPersons(params.get('personOrPersons'));
      console.log('personOrPersons', this.personOrPersons);
    });
  }
}
