import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  username: string;
  password: string;
  keyUsernameAdmin: string = "admin"
  keyPasswordAdmin: string = "1234";
  keyUsername: string = "ENE"
  keyPassword: string = "1234";
  monthlyEventColor: string = 'accent';

  onClick() {
    if (this.password === this.keyPasswordAdmin && this.username === this.keyUsernameAdmin) {
      this.router.navigate(['/table'], { queryParams: { user: 'admin' } });
    }
    if (this.password === this.keyPassword && this.username === this.keyUsername) {
      this.router.navigate(['/table']);
    }
  }
}
