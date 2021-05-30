import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableStarRatingComponent } from './editable-star-rating.component';

describe('EditableStarRatingComponent', () => {
  let component: EditableStarRatingComponent;
  let fixture: ComponentFixture<EditableStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableStarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
