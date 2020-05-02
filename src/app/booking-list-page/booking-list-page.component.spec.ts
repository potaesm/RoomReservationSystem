import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListPageComponent } from './booking-list-page.component';

describe('BookingListPageComponent', () => {
  let component: BookingListPageComponent;
  let fixture: ComponentFixture<BookingListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
