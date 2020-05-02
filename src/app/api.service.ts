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

  sendEmail(subject: string, text: string, receiverUser: string): Observable<Booking> {
    return this.http.post<Booking>(this.ApiUrl + '/sendEmail/?service=gmail', {
      senderUser: 'Room.ene.kmutt@gmail.com',
      senderPass: 'rrsene000',
      receiverUser: receiverUser,
      subject: subject,
      text: text
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe((data) => {
        return data;
      });
  }

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

  deleteBooking(id: string): Observable<Booking> {
    return this.http.delete<Booking>(this.ApiUrl + this.RegisterBookingCollection + `&id=${id}`)
      .pipe((data) => {
        return data;
      });
  }

}
