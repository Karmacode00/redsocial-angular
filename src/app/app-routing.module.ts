import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WallComponent } from './wall/wall.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'wall', component: WallComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
