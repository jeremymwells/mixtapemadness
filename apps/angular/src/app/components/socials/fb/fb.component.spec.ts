import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBComponent } from './fb.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIconComponent } from '@ng-icons/core';
import { SubHeadComponent } from '../../sub-head.component/sub-head.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FBComponent', () => {
  let component: FBComponent;
  let fixture: ComponentFixture<FBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FBComponent,
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        YouTubePlayerModule,
        FlexLayoutModule,
        NgIconComponent,
        SubHeadComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
