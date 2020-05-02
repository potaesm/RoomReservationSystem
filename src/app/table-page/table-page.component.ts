import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  constructor(private api: ApiService) { }

  units: any = [];
  dataArray: any = [];
  CB40901_Status: any = [];
  CB40902_Status: any = [];
  CB40903_Status: any = [];
  CB41001_Status: any = [];
  CB41002_Status: any = [];
  CB41003_Status: any = [];
  CB41004_Status: any = [];
  CB41005_Status: any = [];

  filterDay: string = '';

  teachersFilterArray: any = [];
  teacherDataArray: any = [];
  days: Select[] = [
    { value: 'จันทร์', viewValue: 'จันทร์' },
    { value: 'อังคาร', viewValue: 'อังคาร' },
    { value: 'พุธ', viewValue: 'พุธ' },
    { value: 'พฤหัสบดี', viewValue: 'พฤหัสบดี' },
    { value: 'ศุกร์', viewValue: 'ศุกร์' },
    { value: 'เสาร์', viewValue: 'เสาร์' },
    { value: 'อาทิตย์', viewValue: 'อาทิตย์' }
  ];

  displayedColumns: string[] = ['TIME', 'CB40901', 'CB40902', 'CB40903', 'CB41001', 'CB41002', 'CB41003', 'CB41004', 'CB41005'];

  ngOnInit() {
  }

  onSelectedDay(filterDay: string) {
    let message = 'จองแล้ว';
    let iteration = 13;

    this.units = [];
    this.CB40901_Status = [];
    this.CB40902_Status = [];
    this.CB40903_Status = [];
    this.CB41001_Status = [];
    this.CB41002_Status = [];
    this.CB41003_Status = [];
    this.CB41004_Status = [];
    this.CB41005_Status = [];

    for (let i = 0; i < iteration; i++) {
      this.units.push({
        time: `${i + 8}.00`
      });
      if (i % 2 === 0) {
        this.units.push({
          time: `${i + 8}.30`
        });
      } else {
        this.units.push({
          time: `${i + 8}.30`
        });
      }
    }

    this.api.getBooking()
      .subscribe(data => {

        this.dataArray = data;

        for (let i = 0; i < this.dataArray.length; i++) {
          if (this.dataArray[i].selectedDay === filterDay && this.dataArray[i].status) {
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

        for (let i = 0; i < this.CB40901_Status.length; i++) {
          this.units[this.CB40901_Status[i]].CB40901 = message;
        }
        for (let i = 0; i < this.CB40902_Status.length; i++) {
          this.units[this.CB40902_Status[i]].CB40902 = message;
        }
        for (let i = 0; i < this.CB40903_Status.length; i++) {
          this.units[this.CB40903_Status[i]].CB40903 = message;
        }
        for (let i = 0; i < this.CB41001_Status.length; i++) {
          this.units[this.CB41001_Status[i]].CB41001 = message;
        }
        for (let i = 0; i < this.CB41002_Status.length; i++) {
          this.units[this.CB41002_Status[i]].CB41002 = message;
        }
        for (let i = 0; i < this.CB41003_Status.length; i++) {
          this.units[this.CB41003_Status[i]].CB41003 = message;
        }
        for (let i = 0; i < this.CB41004_Status.length; i++) {
          this.units[this.CB41004_Status[i]].CB41004 = message;
        }
        for (let i = 0; i < this.CB41005_Status.length; i++) {
          this.units[this.CB41005_Status[i]].CB41005 = message;
        }
      });
  }
}
