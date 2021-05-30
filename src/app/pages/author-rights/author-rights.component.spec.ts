import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRightsComponent } from './author-rights.component';

describe('AuthorRightsComponent', () => {
  let component: AuthorRightsComponent;
  let fixture: ComponentFixture<AuthorRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
