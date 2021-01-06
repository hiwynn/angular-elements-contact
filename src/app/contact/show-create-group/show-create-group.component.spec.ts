import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreateGroupComponent } from './show-create-group.component';

describe('ShowCreateGroupComponent', () => {
  let component: ShowCreateGroupComponent;
  let fixture: ComponentFixture<ShowCreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCreateGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
