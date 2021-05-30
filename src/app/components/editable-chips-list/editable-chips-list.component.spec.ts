import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableChipsListComponent } from './editable-chips-list.component';

describe('EditableChipsListComponent', () => {
  let component: EditableChipsListComponent;
  let fixture: ComponentFixture<EditableChipsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableChipsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableChipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
