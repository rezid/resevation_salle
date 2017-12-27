import { Routes } from '@angular/router';
import { RegisterFormComponent } from './auth/component/register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './auth/component/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: RegisterFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'room/:id', component: RoomComponent },
    { path: 'room/:id/register', component: RegisterFormComponent },
  ];
