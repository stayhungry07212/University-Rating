import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewResponseComponent } from './review-response.component';

describe('ReviewResponseComponent', () => {
  let component: ReviewResponseComponent;
  let fixture: ComponentFixture<ReviewResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
