import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeComponent } from './subscribe.component';
import { CommonModule } from '@angular/common';

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SubscribeComponent,
        CommonModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
