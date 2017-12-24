import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth-service/auth.service';
import { DataService } from './core/services/data-service/data.service';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HeaderComponent } from './layout/header/header.component';
import { LoginFormComponent } from './layout/header/login-form/login-form.component';
import { RegistredFormComponent } from './layout/header/registred-form/registred-form.component';
import { RegisterFormComponent } from './auth/component/register-form/register-form.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RoomListComponent } from './home/room-list/room-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegistredFormComponent,
    RegisterFormComponent,
    HomeComponent,
    FooterComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
