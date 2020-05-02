import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-booking-list-page',
  templateUrl: './booking-list-page.component.html',
  styleUrls: ['./booking-list-page.component.css']
})
export class BookingListPageComponent implements OnInit {
  requests: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getBooking()
      .subscribe(data => {
        this.requests = data;
      });
  }

}
