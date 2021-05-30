import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramDialogComponent } from './add-program-dialog.component';

describe('AddProgramDialogComponent', () => {
  let component: AddProgramDialogComponent;
  let fixture: ComponentFixture<AddProgramDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
