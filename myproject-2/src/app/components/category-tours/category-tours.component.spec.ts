import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryToursComponent } from './category-tours.component';

describe('CategoryToursComponent', () => {
  let component: CategoryToursComponent;
  let fixture: ComponentFixture<CategoryToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryToursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
