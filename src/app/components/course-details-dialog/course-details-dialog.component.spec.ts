import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsDialogComponent } from './course-details-dialog.component';

describe('CourseDetailsDialogComponent', () => {
  let component: CourseDetailsDialogComponent;
  let fixture: ComponentFixture<CourseDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
