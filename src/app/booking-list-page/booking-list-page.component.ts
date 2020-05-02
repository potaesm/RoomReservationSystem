import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-booking-list-page',
  templateUrl: './booking-list-page.component.html',
  styleUrls: ['./booking-list-page.component.css']
})
export class BookingListPageComponent implements OnInit {
  requests: any;
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.api.getBooking()
      .subscribe(data => {
        this.requests = data;
      });
  }

  onClick(request: any) {
    if (request.rejectReason !== undefined) {
      console.log(request.id, request.rejectReason);
      // this.api.deleteBooking(request.id);
    } else {
      this.dialog.open(DialogComponent, { width: '250px', data: { title: "ข้อมูลผิดพลาด", content: "กรุณาระบุเหตุผลในการไม่อนุมัติการจอง" } });
    }
  }

}
