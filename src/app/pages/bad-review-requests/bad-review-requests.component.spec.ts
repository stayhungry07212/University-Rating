import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadReviewRequestsComponent } from './bad-review-requests.component';

describe('BadReviewRequestsComponent', () => {
  let component: BadReviewRequestsComponent;
  let fixture: ComponentFixture<BadReviewRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadReviewRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadReviewRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
