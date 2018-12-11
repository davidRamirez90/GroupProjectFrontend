import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserlistComponent } from './browserlist.component';

describe('BrowserlistComponent', () => {
  let component: BrowserlistComponent;
  let fixture: ComponentFixture<BrowserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
