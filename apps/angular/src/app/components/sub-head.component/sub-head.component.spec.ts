import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubHeadComponent } from './sub-head.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIconComponent } from '@ng-icons/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubHeadComponent', () => {
  let component: SubHeadComponent;
  let fixture: ComponentFixture<SubHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SubHeadComponent,
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        YouTubePlayerModule,
        FlexLayoutModule,
        NgIconComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
