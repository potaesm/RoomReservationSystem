import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, public dialog: MatDialog) { }

  CB40901_Status: any = [];
  CB40902_Status: any = [];
  CB40903_Status: any = [];
  CB41001_Status: any = [];
  CB41002_Status: any = [];
  CB41003_Status: any = [];
  CB41004_Status: any = [];
  CB41005_Status: any = [];

  name: string = '';
  codeId: string = '';
  tel: string = '';
  email: string = '';
  selectedRoom: string = '';
  selectedDay: string = '';
  bookingInitialTime: string = '';
  bookingTerminateTime: string = '';
  reason: string = '';

  initialIntPart: number = null;
  terminateIntPart: number = null;
  initialFloatPart: number = null;
  terminateFloatPart: number = null;

  unit: any[] = [];

  id: string = 'auto';

  rooms: Select[] = [
    { value: 'CB40901', viewValue: 'CB40901' },
    { value: 'CB40902', viewValue: 'CB40902' },
    { value: 'CB40903', viewValue: 'CB40903' },
    { value: 'CB41001', viewValue: 'CB41001' },
    { value: 'CB41002', viewValue: 'CB41002' },
    { value: 'CB41003', viewValue: 'CB41003' },
    { value: 'CB41004', viewValue: 'CB41004' },
    { value: 'CB41005', viewValue: 'CB41005' }
  ];
  days: Select[] = [
    { value: 'จันทร์', viewValue: 'จันทร์' },
    { value: 'อังคาร', viewValue: 'อังคาร' },
    { value: 'พุธ', viewValue: 'พุธ' },
    { value: 'พฤหัสบดี', viewValue: 'พฤหัสบดี' },
    { value: 'ศุกร์', viewValue: 'ศุกร์' },
    { value: 'เสาร์', viewValue: 'เสาร์' },
    { value: 'อาทิตย์', viewValue: 'อาทิตย์' }
  ];
  times: Select[] = [
    { value: '08.00', viewValue: '08.00' },
    { value: '08.30', viewValue: '08.30' },
    { value: '09.00', viewValue: '09.00' },
    { value: '09.30', viewValue: '09.30' },
    { value: '10.00', viewValue: '10.00' },
    { value: '10.30', viewValue: '10.30' },
    { value: '11.00', viewValue: '11.00' },
    { value: '11.30', viewValue: '11.30' },
    { value: '12.00', viewValue: '12.00' },
    { value: '12.30', viewValue: '12.30' },
    { value: '13.00', viewValue: '13.00' },
    { value: '13.30', viewValue: '13.30' },
    { value: '14.00', viewValue: '14.00' },
    { value: '14.30', viewValue: '14.30' },
    { value: '15.00', viewValue: '15.00' },
    { value: '15.30', viewValue: '15.30' },
    { value: '16.00', viewValue: '16.00' },
    { value: '16.30', viewValue: '16.30' },
    { value: '17.00', viewValue: '17.00' },
    { value: '17.30', viewValue: '17.30' },
    { value: '18.00', viewValue: '18.00' },
    { value: '18.30', viewValue: '18.30' },
    { value: '19.00', viewValue: '19.00' },
    { value: '19.30', viewValue: '19.30' },
    { value: '20.00', viewValue: '20.00' },
    { value: '20.30', viewValue: '20.30' },
  ];

  teachersFilterArray: any = [];
  subjectsFilterArray: any = [];

  dataArray: any = [];
  studentDataArray: any = [];

  ngOnInit() {
    this.id = 'auto';
  }

  onSubmit() {
    this.CB40901_Status = [];
    this.CB40902_Status = [];
    this.CB40903_Status = [];
    this.CB41001_Status = [];
    this.CB41002_Status = [];
    this.CB41003_Status = [];
    this.CB41004_Status = [];
    this.CB41005_Status = [];

    if (this.name === '' ||
      this.codeId === '' ||
      this.tel === '' ||
      this.email === '' ||
      this.selectedRoom === '' ||
      this.selectedDay === '' ||
      this.bookingInitialTime === '' ||
      this.bookingTerminateTime === '' ||
      this.reason === '') {
      this.dialog.open(DialogComponent, { width: '250px', data: { title: "ข้อมูลผิดพลาด", content: "กรุณากรอกข้อมูลให้ครบถ้วน" } });
    } else {
      if (this.codeId.length === 11 && this.tel.length === 10) {
        let calculatedUnit = this.calculateUnit(this.bookingInitialTime, this.bookingTerminateTime);
        this.api.getBooking()
          .subscribe(data => {
            let registerValid = true;
            this.dataArray = data;

            for (let i = 0; i < this.dataArray.length; i++) {
              if (this.dataArray[i].selectedDay === this.selectedDay) {
                if (this.dataArray[i].selectedRoom === 'CB40901') {
                  this.CB40901_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB40902') {
                  this.CB40902_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB40903') {
                  this.CB40903_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB41001') {
                  this.CB41001_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB41002') {
                  this.CB41002_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB41003') {
                  this.CB41003_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB41004') {
                  this.CB41004_Status.push(...this.dataArray[i].unit);
                }
                if (this.dataArray[i].selectedRoom === 'CB41005') {
                  this.CB41005_Status.push(...this.dataArray[i].unit);
                }
              }
            }

            for (let i = 0; i < calculatedUnit.length; i++) {
              switch (this.selectedRoom) {
                case 'CB40901': {
                  if (this.CB40901_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB40902': {
                  if (this.CB40902_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB40903': {
                  if (this.CB40903_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB41001': {
                  if (this.CB41001_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB41002': {
                  if (this.CB41002_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB41003': {
                  if (this.CB41003_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB41004': {
                  if (this.CB41004_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                case 'CB41005': {
                  if (this.CB41005_Status.includes(calculatedUnit[i])) {
                    registerValid = false;
                  }
                  break;
                }
                default: break;
              }
            }
            if (registerValid) {
              let bookingTimeValid = (Number(this.bookingTerminateTime.substring(0, this.bookingTerminateTime.indexOf("."))) >= Number(this.bookingInitialTime.substring(0, this.bookingInitialTime.indexOf("."))));
              if (bookingTimeValid) {
                this.api.registerBooking({
                  name: this.name,
                  codeId: this.codeId,
                  tel: this.tel,
                  email: this.email,
                  selectedRoom: this.selectedRoom,
                  selectedDay: this.selectedDay,
                  bookingInitialTime: this.bookingInitialTime,
                  bookingTerminateTime: this.bookingTerminateTime,
                  reason: this.reason,
                  unit: calculatedUnit,
                  status: false
                }, this.id)
                  .subscribe(data => {
                    this.dialog.open(DialogComponent, { width: '250px', data: { title: "เสร็จสิ้น", content: "บันทึกข้อมูลแล้ว" } })
                      .afterClosed().subscribe((result) => {
                        this.name = '';
                        this.codeId = '';
                        this.tel = '';
                        this.email = '';
                        this.selectedRoom = '';
                        this.selectedDay = '';
                        this.bookingInitialTime = '';
                        this.bookingTerminateTime = '';
                        this.reason = '';
                        this.router.navigate(['/table']);
                      });
                  });
              } else {
                this.dialog.open(DialogComponent, { width: '250px', data: { title: "ไม่สามารถจองได้", content: "รูปแบบเวลาที่จองไม่ถูกต้อง" } })
                  .afterClosed().subscribe((result) => { });
              }
            } else {
              this.dialog.open(DialogComponent, { width: '250px', data: { title: "ไม่สามารถจองได้", content: "มีคนจองในช่วงเวลาดังกล่าวแล้ว" } })
                .afterClosed().subscribe((result) => { });
            }
          });
      } else {
        this.dialog.open(DialogComponent, { width: '250px', data: { title: "ไม่สามารถจองได้", content: "ข้อมูลเบอร์โทร หรือรหัสไม่ถูกต้อง" } })
        .afterClosed().subscribe((result) => { });
      }
    }
  }

  calculateUnit(bookingInitialTime: string, bookingTerminateTime: string) {
    let initialIntPart = Number(bookingInitialTime.split(".")[0]);
    let terminateIntPart = Number(bookingTerminateTime.split(".")[0]);
    let initialFloatPart = Number(bookingInitialTime.split(".")[1]);
    let terminateFloatPart = Number(bookingTerminateTime.split(".")[1]);
    let unitNumber = ((terminateIntPart - initialIntPart) * 2 + ((terminateFloatPart - initialFloatPart) === 30 ? 1 : (terminateFloatPart - initialFloatPart) === -30 ? -1 : 0));
    let startNumber = ((initialIntPart - 7) * 2 + (initialFloatPart === 30 ? 1 : 0)) - 2;
    let unit = [];
    for (let i = 0; i < unitNumber; i++) {
      unit.push(i + startNumber);
    }
    return unit;
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
