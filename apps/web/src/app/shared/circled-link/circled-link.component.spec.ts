import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircledLinkComponent } from './circled-link.component';

describe('CircledLinkComponent', () => {
  let component: CircledLinkComponent;
  let fixture: ComponentFixture<CircledLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircledLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircledLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
