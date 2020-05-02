import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  name: string;
  codeId: string;
  tel: string;
  email: string;
  selectedRoom: string;
  selectedDay: string;
  bookingInitialTime: string;
  bookingTerminateTime: string;
  reason: string;
  unit: any[];
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private ApiUrl: string = 'https://asia-east2-simplecloudfirestoreapi.cloudfunctions.net/api';
  private RegisterBookingCollection: string = '?collection=Booking';

  registerBooking(Booking: Booking, id: string): Observable<Booking> {
    return this.http.post<Booking>(this.ApiUrl + this.RegisterBookingCollection + `&id=${id}`, Booking, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe((data) => {
        return data;
      });
  }

  getBooking(): Observable<Booking> {
    return this.http.get<Booking>(this.ApiUrl + this.RegisterBookingCollection)
      .pipe((data) => {
        return data;
      });
  }

  deleteBooking(id: number): Observable<Booking> {
    return this.http.delete<Booking>(this.ApiUrl + this.RegisterBookingCollection + `&id=${id}`)
      .pipe((data) => {
        return data;
      });
  }

}
