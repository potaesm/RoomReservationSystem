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

  onOk(request: any) {
    this.api.sendEmail(`ผลการจองห้อง ${request.selectedRoom} ของคุณ${request.name}`, `การจองห้อง ${request.selectedRoom} วัน${request.selectedDay} เวลา ${request.bookingInitialTime} - ${request.bookingTerminateTime} น. ได้รับการอนุมัติเป็นที่เรียบร้อยแล้ว`, request.email)
      .subscribe(data => {
        this.api.verifyBooking(request.id).subscribe(data => {
          this.dialog.open(DialogComponent, { width: '250px', data: { title: "อนุมัติแล้ว", content: "แจ้งผลการอนุมัติไปยังอีเมล์ของผู้ใช้แล้ว" } })
            .afterClosed().subscribe((result) => {
              this.ngOnInit();
            });
        });
      });
  }

  onReject(request: any) {
    if (request.rejectReason !== undefined) {
      this.api.sendEmail(`ผลการจองห้อง ${request.selectedRoom} ของคุณ${request.name}`, `การจองห้อง ${request.selectedRoom} วัน${request.selectedDay} เวลา ${request.bookingInitialTime} - ${request.bookingTerminateTime} น. ไม่ได้รับการอนุมัติเนื่องจาก${request.rejectReason}`, request.email)
        .subscribe(data => {
          this.api.deleteBooking(request.id).subscribe(data => {
            this.dialog.open(DialogComponent, { width: '250px', data: { title: "ไม่อนุมัติการจอง", content: "แจ้งผลการไม่อนุมัติไปยังอีเมล์ของผู้ใช้แล้ว" } })
              .afterClosed().subscribe((result) => {
                this.ngOnInit();
              });
          });
        });
    } else {
      this.dialog.open(DialogComponent, { width: '250px', data: { title: "ข้อมูลผิดพลาด", content: "กรุณาระบุเหตุผลในการไม่อนุมัติการจอง" } });
    }
  }

}
