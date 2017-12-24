import { Routes } from '@angular/router';
import { RegisterFormComponent } from './auth/component/register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'room/:id', component: RoomComponent },
  ];
