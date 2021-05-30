import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableExpansionPanelComponent } from './editable-expansion-panel.component';

describe('EditableExpansionPanelComponent', () => {
  let component: EditableExpansionPanelComponent;
  let fixture: ComponentFixture<EditableExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
