import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUniversityComponent } from './request-university.component';

describe('RequestUniversityComponent', () => {
  let component: RequestUniversityComponent;
  let fixture: ComponentFixture<RequestUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
