import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.signOut();
  }

}
