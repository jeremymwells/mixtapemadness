import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialsHomeComponent } from './socials-home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIconComponent } from '@ng-icons/core';
import { SubHeadComponent } from '../sub-head.component/sub-head.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SocialsHomeComponent', () => {
  let component: SocialsHomeComponent;
  let fixture: ComponentFixture<SocialsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SocialsHomeComponent,
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        YouTubePlayerModule,
        FlexLayoutModule,
        NgIconComponent,
        SubHeadComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
