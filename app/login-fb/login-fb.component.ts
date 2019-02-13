import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-fb',
  templateUrl: './login-fb.component.html',
  styleUrls: ['./login-fb.component.css']
})
export class LoginFbComponent implements OnInit {

  constructor(public auth: AuthService, router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

}
