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
  keyUsername: string = "ENE"
  keyPassword: string = "1234";
  loggedin: boolean = false;
  monthlyEventColor: string = 'accent';

  onClick() {
    if (this.password === this.keyPassword && this.username === this.keyUsername) {
      this.loggedin = true;
      this.router.navigate(['/table']);
    }
  }
}
