import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutWidgetComponent } from './doughnut-widget.component';

describe('DoughnutWidgetComponent', () => {
  let component: DoughnutWidgetComponent;
  let fixture: ComponentFixture<DoughnutWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
