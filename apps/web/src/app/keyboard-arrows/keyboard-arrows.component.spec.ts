import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardArrowsComponent } from './keyboard-arrows.component';

describe('KeyboardArrowsComponent', () => {
  let component: KeyboardArrowsComponent;
  let fixture: ComponentFixture<KeyboardArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardArrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
