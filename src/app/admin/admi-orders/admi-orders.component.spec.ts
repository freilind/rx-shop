import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiOrdersComponent } from './admi-orders.component';

describe('AdmiOrdersComponent', () => {
  let component: AdmiOrdersComponent;
  let fixture: ComponentFixture<AdmiOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmiOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
