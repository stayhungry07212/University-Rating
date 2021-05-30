import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveButtonComponent } from './wave-button.component';

describe('WaveButtonComponent', () => {
  let component: WaveButtonComponent;
  let fixture: ComponentFixture<WaveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
