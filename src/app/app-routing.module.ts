import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingListPageComponent } from './booking-list-page/booking-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: 'booking-list', component: BookingListPageComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
