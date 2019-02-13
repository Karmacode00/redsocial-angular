import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginFbComponent } from './login-fb/login-fb.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { WallComponent } from './wall/wall.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WallContentComponent } from './wall-content/wall-content.component';
import { PostService } from './post.service';
import { ProfileComponent } from './profile/profile.component';
import { AddPostComponent } from './add-post/add-post.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginEmailComponent,
    LoginFbComponent,
    LoginGoogleComponent,
    WallComponent,
    RegisterComponent,
    NavbarComponent,
    WallContentComponent,
    ProfileComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    MatCardModule,
    MatSnackBarModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase, 'redsocial-angular'),
  ],
  providers: [AuthService, AngularFirestore, AuthGuard, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
