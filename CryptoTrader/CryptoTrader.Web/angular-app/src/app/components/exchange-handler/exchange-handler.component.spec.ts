import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeHandlerComponent } from './exchange-handler.component';

describe('ExchangeHandlerComponent', () => {
  let component: ExchangeHandlerComponent;
  let fixture: ComponentFixture<ExchangeHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
