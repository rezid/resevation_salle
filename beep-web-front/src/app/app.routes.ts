import { Routes } from '@angular/router';
import { RegisterFormComponent } from './auth/component/register-form/register-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterFormComponent },
  ];
