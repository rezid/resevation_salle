import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { RoomDetailPageComponent } from './room/room-detail-page/room-detail-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'room/:id', component: RoomDetailPageComponent },
    // { path: 'room/:id/register', component: RegisterFormComponent },
  ];
