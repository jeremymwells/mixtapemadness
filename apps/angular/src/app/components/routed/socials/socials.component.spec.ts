import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialsComponent } from './socials.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('SocialsComponent', () => {
  let component: SocialsComponent;
  let fixture: ComponentFixture<SocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SocialsComponent,
        CommonModule,
        RouterModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
