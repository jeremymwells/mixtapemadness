import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AboutService } from './about.service';
import { register } from 'swiper/element/bundle';

register()

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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  // config: SwiperOptions = {
  //   pagination: { el: '.swiper-pagination', clickable: true },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   spaceBetween: 30
  // };




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
