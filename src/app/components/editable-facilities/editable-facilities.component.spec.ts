import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableFacilitiesComponent } from './editable-facilities.component';

describe('EditableFacilitiesComponent', () => {
  let component: EditableFacilitiesComponent;
  let fixture: ComponentFixture<EditableFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
