import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { RoomService } from './core/services/room.service';
// import { DataService } from './core/services/data-service/data.service';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HeaderComponent } from './layout/header/header.component';


import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';

import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RoomListComponent } from './home/content/room-list/room-list.component';
import { CalendarComponent } from './reservation/calendar/calendar.component';
import { ProfileDropdownComponent } from './layout/header/profile-dropdown/profile-dropdown.component';
import { ContentHeaderComponent } from './home/content/content-header/content-header.component';
import { CustomizeComponent } from './home/content/customize/customize.component';
import { FilterSummaryComponent } from './home/content/filter-summary/filter-summary.component';
import { TaxonsComponent } from './home/sidebar/taxons/taxons.component';
import { ContentComponent } from './home/content/content.component';
import { RoomListItemComponent } from './home/content/room-list/room-list-item/room-list-item.component';
import { BreadcrumbComponent } from './home/breadcrumb/components/breadcrumb/breadcrumb.component';
import { HttpService } from './core/services/http';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { EventService } from './core/services/event.service';
import { ReservationService } from './core/services/reservation.service';
import { RoomDetailPageComponent } from './room/room-detail-page/room-detail-page.component';
import { RoomPriceInfoComponent } from './room/room-detail-page/room-price-info/room-price-info.component';
import { RoomImagesComponent } from './room/room-detail-page/room-images/room-images.component';
import { RoomDetailsComponent } from './room/room-detail-page/room-details/room-details.component';
import { RoomDescriptionComponent } from './room/room-detail-page/room-description/room-description.component';
import { ReservationComponent } from './reservation/reservation.component';

export function httpInterceptor(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
) {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    HomeComponent,
    ContentComponent,
    TaxonsComponent,
    RoomListComponent,
    RoomListItemComponent,
    FilterSummaryComponent,
    CustomizeComponent,
    ContentHeaderComponent,
    BreadcrumbComponent,

    FooterComponent,
    RoomListComponent,

    RoomDetailPageComponent,
    RoomPriceInfoComponent,
    RoomImagesComponent,
    RoomDetailsComponent,
    RoomDescriptionComponent,


    CalendarComponent,
    ReservationComponent,

    ProfileDropdownComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    RoomService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    ReservationService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    EventService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
