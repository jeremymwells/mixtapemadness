import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YTComponent } from './yt.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIconComponent } from '@ng-icons/core';
import { SubHeadComponent } from '../../../general-use/sub-head.component/sub-head.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('YTComponent', () => {
  let component: YTComponent;
  let fixture: ComponentFixture<YTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        YTComponent,
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        YouTubePlayerModule,
        FlexLayoutModule,
        NgIconComponent,
        SubHeadComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
