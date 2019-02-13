import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css'],
  providers: [FormBuilder, AngularFirestore]
})
export class LoginEmailComponent implements OnInit {

    authForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {
    }
    ngOnInit() {
      this.createAuthForm();
    }
    createAuthForm() {
      this.authForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
    }

    onLogin() {
      this.authService.login(this.authForm.value.email, this.authForm.value.password)
        .then(() => {
          this.snackBar.open('Estás conectado', null, {
            duration: 3000
          });
          this.router.navigate(['wall']);
        })
        .catch((err) => {
         if (err.code === 'auth/wrong-password') {
          this.snackBar.open('Password incorrecto', null, {
            duration: 3000
          });
         }
         if (err.code === 'auth/user-not-found') {
          this.snackBar.open('Debes estar registrado', null, {
            duration: 3000
          });
         }
         this.router.navigate(['login']);
        });
    }
  }
