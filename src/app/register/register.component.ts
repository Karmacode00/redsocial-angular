import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: FormGroup;
  name: string;
  email: string;

  usersCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private afs: AngularFirestore, public router: Router) {
    this.createUser();
    this.usersCollection = afs.collection<any>('users');
    this.items = this.usersCollection.valueChanges();
  }

  ngOnInit() {
  }

  createUser() {
    this.newUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  addUser() {
  this.authService.register(this.newUser.value.email, this.newUser.value.pass)
    .then((success) => {
      this.router.navigate(['wall']);
     this.usersCollection.add({

        name: this.newUser.value.name,
        email: this.newUser.value.email,

      }).catch((err) => {
        console.log(err);
      });
    })
    .catch((error) => {
      console.log('Error: ' + error);
    });
}

}
