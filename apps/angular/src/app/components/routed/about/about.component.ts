import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from '../../general-use/sub-head.component/sub-head.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AboutService } from './about.service';
import { FlexLayoutModule, MediaObserver } from '@angular/flex-layout';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProgressSpinnerComponent } from '../../general-use/progress-spinner/progress-spinner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mixtapemadness-about',
  standalone: true,
  imports: [
    CommonModule,
    SubHeadComponent,
    RouterModule,
    FlexLayoutModule,
    NgImageSliderModule,
    ProgressSpinnerComponent,
  ],
  providers: [
    AboutService,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  private subscription = new Subscription();
  imagesLoaded = false;
  personOrPersons: any;
  otherPersons: any;
  constructor(
    private route: ActivatedRoute,
    private aboutService: AboutService,
  ) {
    this.subscription.add(this.route.paramMap.subscribe(params => {
      this.personOrPersons = this.aboutService.getPersonOrPersons(params.get('personOrPersons'));
      this.otherPersons = this.aboutService.getNotPersonOrPersons(params.get('personOrPersons'));
      setTimeout(() => {
        console.log('TITLE SHOULD Be', this.personOrPersons.title);
        this.imagesLoaded = true;
      }, 1500);
    }))
  }
}
