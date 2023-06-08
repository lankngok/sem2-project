import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursdetailComponent } from './toursdetail.component';

describe('ToursdetailComponent', () => {
  let component: ToursdetailComponent;
  let fixture: ComponentFixture<ToursdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
