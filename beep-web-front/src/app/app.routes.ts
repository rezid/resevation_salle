import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'room/:id', component: RoomComponent },
    // { path: 'room/:id/register', component: RegisterFormComponent },
  ];
